import { PrismaClient } from "@prisma/client";
import { UpdateUserSchema, ReadUserSchema, CreateUserSchema } from "../schemas/user.schema";
import { NotFoundError } from "../exceptions/errors/not-found-error";
import { getStringAsNumberSafe } from "../utils/validate_id";

const prisma = new PrismaClient()

/**
 * Create User
 *
 * @param userDto
 */
export async function createUser(userDto: CreateUserSchema): Promise<ReadUserSchema> {
  const user = await prisma.user.create({
    data: {
      email: userDto.email,
      password: userDto.password,
    }
  });

  return new ReadUserSchema(user.id, user.email);
}

/**
 * Read User
 *
 * @param userId
 */
export async function readUser(userId: string): Promise<ReadUserSchema> {
  var userIdAsNumber;
  try {
    userIdAsNumber = getStringAsNumberSafe(userId)
  } catch {
    throw new NotFoundError(`User with id ${userId} not found.`)
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userIdAsNumber,
    }
  });

  if (user == null) {
    throw new NotFoundError(`User with id ${userId} not found.`)
  }

  return new ReadUserSchema(user.id, user.email);
}

/**
 * Update User
 *
 * @param userId
 * @param userDto
 */
export async function updateUser(userId: string, userDto: UpdateUserSchema): Promise<ReadUserSchema> {
  var userIdAsNumber;
  try {
    userIdAsNumber = getStringAsNumberSafe(userId)
  } catch {
    throw new NotFoundError(`User with id ${userId} not found.`)
  }

  const user = await prisma.user.update({
    where: {
      id: userIdAsNumber,
    },
    data: {
      email: userDto.email,
      password: userDto.password,
    }
  });

  return new ReadUserSchema(user.id, user.email);
}

/**
 * Read all users
 *
 * @param userId
 * @param userDto
 */
export async function readAllUsers(): Promise<ReadUserSchema[]> {
  const users = await prisma.user.findMany();
  return users.map(user => new ReadUserSchema(user.id, user.email))
}
