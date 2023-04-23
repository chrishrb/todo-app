import { PrismaClient } from "@prisma/client";
import { UpdateUserSchema, ReadUserSchema, CreateUserSchema } from "../schemas/user.schema";
import { NotFoundError } from "../exceptions/errors/not-found-error";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()

/**
 * Create User
 *
 * @param userDto
 */
export async function createUser(userDto: CreateUserSchema): Promise<ReadUserSchema> {
  const hashedPassword = await bcrypt.hash(userDto.password, 10)

  const user = await prisma.user.create({
    data: {
      email: userDto.email,
      password: hashedPassword,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
    }
  });

  return new ReadUserSchema(user.id, user.email, user.firstName, user.lastName);
}

export async function setAsAdmin(userId: string): Promise<ReadUserSchema> {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isAdmin: true,
    }
  });

  return new ReadUserSchema(user.id, user.email, user.firstName, user.lastName);
}

/**
 * Read User
 *
 * @param userId
 */
export async function readUser(userId: string): Promise<ReadUserSchema> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    }
  });

  if (user == null) {
    throw new NotFoundError(`User with id ${userId} not found.`)
  }

  return new ReadUserSchema(user.id, user.email, user.firstName, user.lastName);
}

/**
 * Update User
 *
 * @param userId
 * @param userDto
 */
export async function updateUser(userId: string, userDto: UpdateUserSchema): Promise<ReadUserSchema> {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      email: userDto.email,
      password: userDto.password,
    }
  });

  return new ReadUserSchema(user.id, user.email, user.firstName, user.lastName);
}

/**
 * Read all users
 *
 * @param userId
 * @param userDto
 */
export async function readAllUsers(): Promise<ReadUserSchema[]> {
  const users = await prisma.user.findMany();
  return users.map(user => new ReadUserSchema(user.id, user.email, user.firstName, user.lastName))
}
