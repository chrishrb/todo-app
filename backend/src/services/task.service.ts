import { PrismaClient } from "@prisma/client";
import { CreateTaskMeSchema, CreateTaskSchema, ReadTaskSchema, UpdateTaskSchema } from "../schemas/task.schema";
import { NotFoundError } from "../exceptions/errors/not-found-error";
import { notEmpty } from "../exceptions/helpers";

const prisma = new PrismaClient();

export async function createTask(userId: string, taskDto: CreateTaskSchema | CreateTaskMeSchema): Promise<ReadTaskSchema> {
  const task = await prisma.task.create({
    data: {
      title: taskDto.title,
      description: taskDto.description,
      dueDate: taskDto.dueDate,
      tag: taskDto.tag,
      user: { 
        connect: { 
          id: userId,
        },
      },
    }
  });

  return new ReadTaskSchema(task.id, task.userId, task.title, task.description, task.dueDate?.toISOString(), task.isChecked, task.tag);
}

export async function updateTask(taskId: string, taskDto: UpdateTaskSchema) {
  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      title: notEmpty(taskDto.title) ? taskDto.title! : undefined,
      description: notEmpty(taskDto.description) ? taskDto.description : undefined,
      dueDate: notEmpty(taskDto.dueDate) ? taskDto.dueDate : undefined,
      isChecked: taskDto.isChecked != null ? taskDto.isChecked : undefined,
    }
  });

  return new ReadTaskSchema(task.id, task.userId, task.title, task.description, task.dueDate?.toISOString(), task.isChecked, task.tag);
}

export async function readTask(taskId: string): Promise<ReadTaskSchema> {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    }
  });

  if (task == null) {
    throw new NotFoundError([{field: 'id', value: taskId, replyMessage: `Task with id ${taskId} not found.`}])
  }

  return new ReadTaskSchema(task.id, task.userId, task.title, task.description, task.dueDate?.toISOString(), task.isChecked, task.tag);
}

export async function readAllTasks(): Promise<ReadTaskSchema[]> {
  const tasks = await prisma.task.findMany();
  return tasks.map(task => new ReadTaskSchema(task.id, task.userId, task.title, task.description, task.dueDate?.toISOString(), task.isChecked, task.tag));
}

export async function readAllTasksByUser(userId: string): Promise<ReadTaskSchema[]> {
  const tasks = await prisma.task.findMany({
    where: {
      userId: userId,
    },
  });

  return tasks.map(task => new ReadTaskSchema(task.id, task.userId, task.title, task.description, task.dueDate?.toISOString(), task.isChecked, task.tag));
}

export async function deleteTask(taskId: string): Promise<void> {
  await prisma.task.delete({
    where: {
      id: taskId,
    }
  });
}

export async function toggleTask(taskId: string, currentIsChecked: boolean): Promise<ReadTaskSchema> {
  const taskNow = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      isChecked: !currentIsChecked,
    }
  })

  return new ReadTaskSchema(taskNow.id, taskNow.userId, taskNow.title, taskNow.description, taskNow.dueDate?.toISOString(), taskNow.isChecked, taskNow.tag);
}

export async function readAllTasksWithSpecifiedTagByUser(userId: string, tag: string): Promise<ReadTaskSchema[]> {
  const tasks = await prisma.task.findMany({
    where: {
      userId: userId,
      tag: tag
    },
  });

  return tasks.map(task => new ReadTaskSchema(task.id, task.userId, task.title, task.description, task.dueDate?.toISOString(), task.isChecked, task.tag));
}
