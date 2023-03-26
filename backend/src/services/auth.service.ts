import { PrismaClient } from "@prisma/client";
import { ForbiddenError } from "../exceptions/errors/login-error";
import { InternalError } from "../exceptions/errors/internal-error";
import jsonwebtoken from "jsonwebtoken"
import { LoginSchema, AuthLoginSchema, JwtVerifySchema } from "../schemas/auth.schema";

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

  const token = jsonwebtoken.sign({ userId: user.id, email: user.email }, process.env.AUTH_SECRET_KEY, { expiresIn: "1h"})
  return new AuthLoginSchema(token);
}

/*
 * Verify JWT
 *
 * @param userId
 * @param userDto
 */
export async function verify(jwt: JwtVerifySchema): Promise<JwtVerifySchema> {
  if (!process.env.AUTH_SECRET_KEY) {
    throw new InternalError("Authentication does not work. No AUTH_SECRET_KEY found in env.")
  }

  try {
    jsonwebtoken.verify(jwt.access_token, process.env.AUTH_SECRET_KEY);
  } catch {
    throw new ForbiddenError();
  }

  return jwt;
}
