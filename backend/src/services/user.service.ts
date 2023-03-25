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

export async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users.map(user => new ReadUserSchema(user.id, user.email))
}
