import { PrismaClient } from "@prisma/client";
import { CreateTaskSchema, ReadTaskSchema, UpdateTaskSchema } from "../schemas/task.schema";
import { NotFoundError } from "../exceptions/errors/not-found-error";

const prisma = new PrismaClient();

/**
 * Create Task
 *
 * @param taskDto
 */
export async function createTask(userId: string, taskDto: CreateTaskSchema): Promise<ReadTaskSchema> {
  console.log(userId)
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

/**
 * Update Task
 *
 * @param taskId, taskDto
 */
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

/**
 * Read Task
 *
 * @param taskId
 */
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

/**
 * Read all Tasks
 *
 */
export async function readAllTasks(): Promise<ReadTaskSchema[]> {
  const tasks = await prisma.task.findMany();
  return tasks.map(task => new ReadTaskSchema(task.id, task.userId, task.title, task.description, task.dueDate, task.isChecked));
}

export async function deleteTask(taskId: number): Promise<void> {
  await prisma.task.delete({
    where: {
      id: taskId,
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
