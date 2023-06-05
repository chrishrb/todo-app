import { PrismaClient } from "@prisma/client";
import { UnauthorizedError } from "../exceptions/errors/login-error";
import { InternalError } from "../exceptions/errors/internal-error";
import jsonwebtoken from "jsonwebtoken"
import { LoginSchema, JwtPayloadSchema, TokenSchema, JwtType } from "../schemas/auth.schema";
import { Response, Request, NextFunction } from "express";
import * as bcrypt from 'bcrypt';
import { config } from "../utils/config";
import { createClient } from 'redis';
import dayjs from 'dayjs';
import ms from 'ms'

const prisma = new PrismaClient()
const redis = createClient({url: process.env.REDIS_CLIENT_URL});

async function saveTokenToBlacklist(token: string, expiresIn: string) {
  await redis.connect();
  await redis.set(`blacklist_${token}`, 'true')
  await redis.expireAt(`blacklist_${token}`, dayjs().add(ms(expiresIn), 'milliseconds').add(1, 'hour').toDate())
  await redis.disconnect()
}

async function isTokenOnBlacklist(token: string): Promise<boolean> {
  await redis.connect();
  const value = await redis.get(`blacklist_${token}`)
  await redis.disconnect()

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
    throw new UnauthorizedError();
  }
}

function getAccessTokenFromHeader(bearerHeader?: string) {
  if (!bearerHeader || typeof bearerHeader !== 'string') {
    throw new UnauthorizedError();
  }
  const [type, token] = bearerHeader.split(" ");

  if (type !== 'Bearer') {
    throw new UnauthorizedError();
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
    throw new UnauthorizedError("Email not found.");
  }

  const isCorrectPassword = await bcrypt.compare(userDto.password, user.password);
  if (!isCorrectPassword) {
    throw new UnauthorizedError("Incorrect password.");
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
    throw new UnauthorizedError("No refresh token or not valid anymore.");
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
    throw new UnauthorizedError("Invalid token")
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
  if (!process.env.AUTH_SECRET_KEY) {
    throw new InternalError("Authentication does not work. No AUTH_SECRET_KEY found in env.")
  }

  const token = getAccessTokenFromHeader(req.headers['authorization'])
  isTokenOnBlacklist(token).then((onBlacklist) => {
    if (onBlacklist) {
      next(new UnauthorizedError())
    } else {
      res.locals.user = verifyToken(JwtType.ACCESS_TOKEN, token)
      next();
    }
  }).catch(e => {
    next(e)
  })
}
