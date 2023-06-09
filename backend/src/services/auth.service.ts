import { PrismaClient } from "@prisma/client";
import { UnauthorizedError } from "../exceptions/errors/login-error";
import jsonwebtoken from "jsonwebtoken"
import { LoginSchema, JwtPayloadSchema, TokenSchema, JwtType } from "../schemas/auth.schema";
import { Response, Request, NextFunction } from "express";
import { config } from "../utils/config";
import redisClient from '../utils/redis';
import dayjs from 'dayjs';
import ms from 'ms'
import { ResponseError } from "../exceptions/response-details";
import { checkPassword } from "../db/user.db";

const prisma = new PrismaClient()

async function saveTokenToBlacklist(token: string, expiresIn: string) {
  const client = await redisClient.getConnection()
  await client?.set(`blacklist_${token}`, 'true')
  await client?.expireAt(`blacklist_${token}`, dayjs().add(ms(expiresIn), 'milliseconds').add(1, 'hour').toDate())
}

async function isTokenOnBlacklist(token: string): Promise<boolean> {
  const client = await redisClient.getConnection()
  const value = await client?.get(`blacklist_${token}`)

  if (value) {
    return true;
  }
  return false;
}

function signToken(payload: object, expiresIn: string | number) {
  return jsonwebtoken.sign(payload, process.env.AUTH_SECRET_KEY!, { expiresIn: expiresIn })
}

function verifyToken(type: JwtType, token: string) {
  try {
    const decoded = jsonwebtoken.verify(token, process.env.AUTH_SECRET_KEY!);
    return JwtPayloadSchema.fromPlainObj(type, decoded);
  } catch {
    throw new UnauthorizedError([{
      field: 'token', 
      replyCode: ResponseError.ACCESS_TOKEN.errorCode,
      replyMessage: ResponseError.ACCESS_TOKEN.errorMessage,
    }]);
  }
}

function getAccessTokenFromHeader(bearerHeader?: string) {
  if (!bearerHeader || typeof bearerHeader !== 'string') {
    throw new UnauthorizedError([{
      field: 'token', 
      replyCode: ResponseError.ACCESS_TOKEN.errorCode,
      replyMessage: ResponseError.ACCESS_TOKEN.errorMessage,
    }]);
  }
  const [type, token] = bearerHeader.split(" ");

  if (type !== 'Bearer') {
    throw new UnauthorizedError([{
      field: 'token', 
      replyCode: ResponseError.ACCESS_TOKEN.errorCode,
      replyMessage: ResponseError.ACCESS_TOKEN.errorMessage,
    }]);
  }
  return token;
}

/*
 * Login user with email and password
 *
 * @param userDto
 */
export async function login(userDto: LoginSchema): Promise<TokenSchema> {
  const user = await prisma.user.findUnique({
    where: {
      email: userDto.email,
    }
  });

  if (!user) {
    throw new UnauthorizedError([{
      field: 'email', 
      value: userDto.email, 
      replyCode: ResponseError.WRONG_EMAIL.errorCode, 
      replyMessage: ResponseError.WRONG_EMAIL.errorMessage
    }]);
  }

  const isCorrectPassword = await checkPassword(userDto.password, user.password);
  if (!isCorrectPassword) {
    throw new UnauthorizedError([{
      field: 'password', 
      replyCode: ResponseError.WRONG_PASSWORD.errorCode, 
      replyMessage: ResponseError.WRONG_PASSWORD.errorMessage
    }]);
  }

  const accessTokenPayload = new JwtPayloadSchema(JwtType.ACCESS_TOKEN, user.id, user.isAdmin);
  const accessToken = signToken(accessTokenPayload.toPlainObj(), config.accessTokenExpiryTime)

  const refreshTokenPayload = new JwtPayloadSchema(JwtType.REFRESH_TOKEN, user.id, user.isAdmin);
  const refreshToken = signToken(refreshTokenPayload.toPlainObj(), config.refreshTokenExpiryTime)

  return new TokenSchema(accessToken, refreshToken);
}

/*
 * Refresh token
 *
 * @param req
 * @param res
 * @param next
 */
export async function refresh(refreshToken?: string): Promise<TokenSchema> {
  if (!refreshToken || await isTokenOnBlacklist(refreshToken)) {
    throw new UnauthorizedError([{
      field: 'token', 
      replyCode: ResponseError.REFRESH_TOKEN.errorCode,
      replyMessage: ResponseError.REFRESH_TOKEN.errorMessage
    }]);
  }
  const decodedRefreshToken = verifyToken(JwtType.REFRESH_TOKEN, refreshToken);

  const newAccessToken = signToken({ ...decodedRefreshToken, "type": JwtType.ACCESS_TOKEN }, config.accessTokenExpiryTime)
  const newRefreshToken = signToken(decodedRefreshToken.toPlainObj(), config.refreshTokenExpiryTime)

  return new TokenSchema(newAccessToken, newRefreshToken)
}

/*
 * Logout
 *
 * @param refreshToken
 * @param accessToken
 */
export async function logout(accessTokenHeader?: string, refreshTokenHeader?: string): Promise<void> {
  if (refreshTokenHeader) {
    await saveTokenToBlacklist(refreshTokenHeader, config.refreshTokenExpiryTime);
  }

  const token = getAccessTokenFromHeader(accessTokenHeader)
  if (await isTokenOnBlacklist(token)) {
    throw new UnauthorizedError([{
      field: 'token', 
      replyCode: ResponseError.ACCESS_TOKEN.errorCode,
      replyMessage: ResponseError.ACCESS_TOKEN.errorMessage,
    }]);
  }
  await saveTokenToBlacklist(token, config.accessTokenExpiryTime);
}

/*
 * Verify JWT middleware
 * Saves an JwtPayloadSchema object in the "res.locals.user" variable
 *
 * @param req
 * @param res
 * @param next
 */
export function verify(req: Request, res: Response, next: NextFunction): void {
  const token = getAccessTokenFromHeader(req.headers['authorization'])
  isTokenOnBlacklist(token).then((onBlacklist) => {
    if (onBlacklist) {
      next(new UnauthorizedError([{
        field: 'token', 
        replyCode: ResponseError.ACCESS_TOKEN.errorCode,
        replyMessage: ResponseError.ACCESS_TOKEN.errorMessage,
      }]))
    } else {
      res.locals.user = verifyToken(JwtType.ACCESS_TOKEN, token)
      next();
    }
  }).catch(e => {
    next(e)
  })
}
