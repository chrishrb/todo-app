import { PrismaClient } from "@prisma/client";
import { UpdateUserSchema, ReadUserSchema, CreateUserSchema } from "../schemas/user.schema";
import { NotFoundError } from "../exceptions/errors/not-found-error";
import * as bcrypt from 'bcrypt';
import { ConflictError } from "../exceptions/errors/conflict-error";
import { ResponseError } from "../exceptions/response-details";

const prisma = new PrismaClient()

export async function createUser(userDto: CreateUserSchema): Promise<ReadUserSchema> {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: userDto.email,
    }
  });
  if (existingUser) {
    throw new ConflictError([{
      field: "email", 
      value: existingUser.email, 
      errorCode: ResponseError.USER_EXISTS.errorCode,
      errorMessage: ResponseError.USER_EXISTS.errorMessage,
    }]);
  }
  
  const hashedPassword = await bcrypt.hash(userDto.password, 10)

  const user = await prisma.user.create({
    data: {
      email: userDto.email,
      password: hashedPassword,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
    }
  });
  
  return new ReadUserSchema(user.id, user.email, user.firstName, user.lastName, user.isAdmin);
}

export async function setAsAdmin(userId: string): Promise<ReadUserSchema> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    }
  });

  if (user == null) {
    throw new NotFoundError([{
      field: 'id', 
      value: userId, 
      errorCode: ResponseError.USER_NOT_FOUND.errorCode,
      errorMessage: ResponseError.USER_NOT_FOUND.errorMessage
    }]);
  }

  const updateUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isAdmin: true,
    }
  });

  return new ReadUserSchema(updateUser.id, updateUser.email, updateUser.firstName, updateUser.lastName, updateUser.isAdmin);
}

export async function readUser(userId: string): Promise<ReadUserSchema> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    }
  });

  if (user == null) {
    throw new NotFoundError([{
      field: 'id', 
      value: userId, 
      errorCode: ResponseError.USER_NOT_FOUND.errorCode,
      errorMessage: ResponseError.USER_NOT_FOUND.errorMessage
    }]);
  }

  return new ReadUserSchema(user.id, user.email, user.firstName, user.lastName, user.isAdmin);
}

export async function updateUser(userId: string, userDto: UpdateUserSchema): Promise<ReadUserSchema> {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      email: userDto.email,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      password: userDto.password,
    }
  });

  return new ReadUserSchema(user.id, user.email, user.firstName, user.lastName, user.isAdmin);
}

export async function readAllUsers(): Promise<ReadUserSchema[]> {
  const users = await prisma.user.findMany();
  return users.map(user => new ReadUserSchema(user.id, user.email, user.firstName, user.lastName, user.isAdmin))
}

export async function deleteUser(userId?: string): Promise<void> {
  const deleteTasks = prisma.task.deleteMany({
    where: {
      userId: userId,
    }
  })

  const delUser = prisma.user.delete({
    where: {
      id: userId,
    },
  });

  await prisma.$transaction([deleteTasks, delUser]).catch(() => {
    throw new NotFoundError([{
      field: 'id', 
      value: userId, 
      errorCode: ResponseError.USER_NOT_FOUND.errorCode,
      errorMessage: ResponseError.USER_NOT_FOUND.errorMessage
    }])
  })
}
