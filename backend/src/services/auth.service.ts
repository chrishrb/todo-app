import { PrismaClient } from "@prisma/client";
import { ForbiddenError } from "../exceptions/errors/login-error";
import { InternalError } from "../exceptions/errors/internal-error";
import jsonwebtoken from "jsonwebtoken"
import { LoginSchema, AuthLoginSchema, JwtPayloadSchema } from "../schemas/auth.schema";
import { Response, Request, NextFunction } from "express";

const prisma = new PrismaClient()

/*
 * Login user with email and password
 *
 * @param userId
 * @param userDto
 */
export async function login(userDto: LoginSchema): Promise<AuthLoginSchema> {
  const user = await prisma.user.findUnique({
    where: {
      email: userDto.email,
    }
  });

  if (!user || user.password !== userDto.password) {
    throw new ForbiddenError();
  }

  if (!process.env.AUTH_SECRET_KEY) {
    throw new InternalError("Authentication does not work. No AUTH_SECRET_KEY found in env.")
  }

  const payload = new JwtPayloadSchema(user.id, user.email);
  const token = jsonwebtoken.sign(payload.toPlainObj(), process.env.AUTH_SECRET_KEY, { expiresIn: "1h"})
  return new AuthLoginSchema(token);
}

/*
 * Verify JWT middleware
 * Saves an JwtPayloadSchema object in the "res.locals.user" variable
 *
 * @param userId
 * @param userDto
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

  try {
    const decoded = jsonwebtoken.verify(token, process.env.AUTH_SECRET_KEY);
    res.locals.user = JwtPayloadSchema.fromPlainObj(decoded);
    next()
  } catch {
    throw new ForbiddenError();
  }
}
