import { PrismaClient } from "@prisma/client";
import { CreateUserSchema, ReadUserSchema } from "../schemas/user.schema";

const prisma = new PrismaClient()

export async function createUser(userDto: CreateUserSchema) {
  const user = await prisma.user.create({
    data: {
      email: userDto.email,
      password: userDto.password,
    }
  });

  return new ReadUserSchema(user.id, user.email);
}
