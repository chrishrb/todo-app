import { PrismaClient } from "@prisma/client";
import { UpdateUserSchema, ReadUserSchema, CreateUserSchema } from "../schemas/user.schema";
import { NotFoundError } from "../exceptions/errors/not-found-error";
import { ConflictError } from "../exceptions/errors/conflict-error";
import { ResponseError } from "../exceptions/response-details";
import { notEmpty } from "../exceptions/helpers";

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
      replyCode: ResponseError.USER_EXISTS.errorCode,
      replyMessage: ResponseError.USER_EXISTS.errorMessage,
    }]);
  }
  
  const user = await prisma.user.create({
    data: {
      email: userDto.email,
      password: userDto.password,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      language: userDto.language != null ? userDto.language : undefined,
    }
  });
  
  return new ReadUserSchema(user.id, user.email, user.firstName, user.lastName, user.isAdmin, user.language);
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
      replyCode: ResponseError.USER_NOT_FOUND.errorCode,
      replyMessage: ResponseError.USER_NOT_FOUND.errorMessage
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

  return new ReadUserSchema(updateUser.id, updateUser.email, updateUser.firstName, updateUser.lastName, updateUser.isAdmin, updateUser.language);
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
      replyCode: ResponseError.USER_NOT_FOUND.errorCode,
      replyMessage: ResponseError.USER_NOT_FOUND.errorMessage
    }]);
  }

  return new ReadUserSchema(user.id, user.email, user.firstName, user.lastName, user.isAdmin, user.language);
}

export async function updateUser(userId: string, userDto: UpdateUserSchema): Promise<ReadUserSchema> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    }
  });

  if (user == null) {
    throw new NotFoundError([{
      field: 'id', 
      value: userId, 
      replyCode: ResponseError.USER_NOT_FOUND.errorCode,
      replyMessage: ResponseError.USER_NOT_FOUND.errorMessage
    }]);
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      email: notEmpty(userDto.email) ? userDto.email! : undefined,
      firstName: notEmpty(userDto.firstName) ? userDto.firstName! : undefined,
      lastName: notEmpty(userDto.lastName) ? userDto.lastName! : undefined,
      password: notEmpty(userDto.password) ? userDto.password! : undefined,
      language: userDto.language != null ? userDto.language : undefined,
    }
  });

  return new ReadUserSchema(updatedUser.id, updatedUser.email, updatedUser.firstName, updatedUser.lastName, updatedUser.isAdmin, updatedUser.language);
}

export async function readAllUsers(): Promise<ReadUserSchema[]> {
  const users = await prisma.user.findMany();
  return users.map(user => new ReadUserSchema(user.id, user.email, user.firstName, user.lastName, user.isAdmin, user.language))
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
      replyCode: ResponseError.USER_NOT_FOUND.errorCode,
      replyMessage: ResponseError.USER_NOT_FOUND.errorMessage
    }])
  })
}
