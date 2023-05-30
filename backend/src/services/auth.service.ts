import { PrismaClient } from "@prisma/client";
import { ForbiddenError } from "../exceptions/errors/login-error";
import { InternalError } from "../exceptions/errors/internal-error";
import jsonwebtoken from "jsonwebtoken"
import { LoginSchema, JwtPayloadSchema, TokenSchema, JwtType } from "../schemas/auth.schema";
import { Response, Request, NextFunction } from "express";
import * as bcrypt from 'bcrypt';
import { config } from "../utils/config";

const prisma = new PrismaClient()

function signToken(payload: object, expiresIn: string | number) {
  return jsonwebtoken.sign(payload, process.env.AUTH_SECRET_KEY!, { expiresIn: expiresIn})
}

function verifyToken(type: JwtType, token: string) {
  try {
    const decoded = jsonwebtoken.verify(token, process.env.AUTH_SECRET_KEY!);
    return JwtPayloadSchema.fromPlainObj(type, decoded);
  } catch {
    throw new ForbiddenError();
  }
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
    throw new ForbiddenError("Email not found.");
  }

  const isCorrectPassword = await bcrypt.compare(userDto.password, user.password);
  if (!isCorrectPassword) {
    throw new ForbiddenError("Incorrect password.");
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
  if (!refreshToken) {
    throw new ForbiddenError("No refresh token");
  }
  const decodedRefreshToken = verifyToken(JwtType.REFRESH_TOKEN, refreshToken);

  const newAccessToken = signToken({ ...decodedRefreshToken, "type": JwtType.ACCESS_TOKEN }, config.accessTokenExpiryTime)
  const newRefreshToken = signToken(decodedRefreshToken.toPlainObj(), config.refreshTokenExpiryTime)

  return new TokenSchema(newAccessToken, newRefreshToken)
}

/*
 * Logout
 *
 * @param req
 * @param res
 * @param next
 */
export function logout(): void {
  throw new InternalError("Not implemented yet.")
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

  const bearerHeader = req.headers['authorization']
  if (bearerHeader == null || typeof bearerHeader !== 'string') {
    throw new ForbiddenError();
  }
  const [type, token] = bearerHeader.split(" ");

  if (type !== 'Bearer') {
    throw new ForbiddenError();
  }

  res.locals.user = verifyToken(JwtType.ACCESS_TOKEN, token)
  next();
}
