import { PrismaClient } from "@prisma/client";
import { CreateTaskMeSchema, CreateTaskSchema, ReadTaskSchema, UpdateTaskSchema } from "../schemas/task.schema";
import { NotFoundError } from "../exceptions/errors/not-found-error";

const prisma = new PrismaClient();

export async function createTask(userId: string, taskDto: CreateTaskSchema | CreateTaskMeSchema): Promise<ReadTaskSchema> {
  const task = await prisma.task.create({
    data: {
      title: taskDto.title,
      description: taskDto.description,
      dueDate: taskDto.dueDate,
      user: { 
        connect: { 
          id: userId,
        },
      },
    }
  });

  return new ReadTaskSchema(task.id, task.userId, task.title, task.description, task.dueDate, task.isChecked);
}

export async function updateTask(taskId: number, taskDto: UpdateTaskSchema) {
  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      isChecked: taskDto.isChecked,
      title: taskDto.title,
      description: taskDto.description,
      dueDate: taskDto.dueDate,
    }
  });

  return new ReadTaskSchema(task.id, task.userId, task.title, task.description, task.dueDate, task.isChecked);
}

export async function readTask(taskId: number): Promise<ReadTaskSchema> {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    }
  });

  if (task == null) {
    throw new NotFoundError(`Task with id: ${taskId} not found.`)
  }

  return new ReadTaskSchema(task.id, task.userId, task.title, task.description, task.dueDate, task.isChecked);
}

export async function readAllTasks(): Promise<ReadTaskSchema[]> {
  const tasks = await prisma.task.findMany();
  return tasks.map(task => new ReadTaskSchema(task.id, task.userId, task.title, task.description, task.dueDate, task.isChecked));
}

export async function readAllTasksByUser(userId: string): Promise<ReadTaskSchema[]> {
  const tasks = await prisma.task.findMany({
    where: {
      userId: userId,
    },
  });

  return tasks.map(task => new ReadTaskSchema(task.id, task.userId, task.title, task.description, task.dueDate, task.isChecked));
}

export async function deleteTask(taskId?: number | string): Promise<void> {
  if(taskId == null || isNaN(+taskId)) {
    throw new NotFoundError(`Task with id: ${taskId} not found.`)
  }

  await prisma.task.delete({
    where: {
      id: +taskId,
    }
  });
}

export async function toggleTask(taskId: number): Promise<ReadTaskSchema> {
  const taskThen = await prisma.task.findUnique({
    where: {
      id: taskId,
    }
  });

  if(taskThen === null) {
    throw new NotFoundError(`Task with id: ${taskId} not found.`)
  }

  const taskNow = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      isChecked: !taskThen?.isChecked
    }
  })

  return new ReadTaskSchema(taskNow.id, taskNow.userId, taskNow.title, taskNow.description, taskNow.dueDate, taskNow.isChecked);
}
