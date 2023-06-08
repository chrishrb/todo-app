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

  return new ReadTaskSchema(task.id, task.userId, task.title, task.description, task.dueDate?.toISOString(), task.isChecked);
}

export async function updateTask(taskId: string, taskDto: UpdateTaskSchema) {
  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      isChecked: taskDto.isChecked != null ? taskDto.isChecked : undefined,
      title: taskDto.title != null ? taskDto.title : undefined,
      description: taskDto.description != null ? taskDto.description : undefined,
      dueDate: taskDto.dueDate != null ? taskDto.dueDate : undefined,
    }
  });

  return new ReadTaskSchema(task.id, task.userId, task.title, task.description, task.dueDate?.toISOString(), task.isChecked);
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

  return new ReadTaskSchema(task.id, task.userId, task.title, task.description, task.dueDate?.toISOString(), task.isChecked);
}

export async function readAllTasks(): Promise<ReadTaskSchema[]> {
  const tasks = await prisma.task.findMany();
  return tasks.map(task => new ReadTaskSchema(task.id, task.userId, task.title, task.description, task.dueDate?.toISOString(), task.isChecked));
}

export async function readAllTasksByUser(userId: string): Promise<ReadTaskSchema[]> {
  const tasks = await prisma.task.findMany({
    where: {
      userId: userId,
    },
  });

  return tasks.map(task => new ReadTaskSchema(task.id, task.userId, task.title, task.description, task.dueDate?.toISOString(), task.isChecked));
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

  return new ReadTaskSchema(taskNow.id, taskNow.userId, taskNow.title, taskNow.description, taskNow.dueDate?.toISOString(), taskNow.isChecked);
}
