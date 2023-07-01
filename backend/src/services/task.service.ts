import { Prisma, PrismaClient } from "@prisma/client";
import { CreateTaskMeSchema, CreateTaskSchema, ReadTaskSchema, UpdateTaskSchema } from "../schemas/task.schema";
import { NotFoundError } from "../exceptions/errors/not-found-error";
import { notEmpty } from "../exceptions/helpers";
import { SortBy, TaskReadQuerySchema } from "../schemas/query.schema";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const prisma = new PrismaClient();

function getOrderBy(sortBy?: SortBy, orderBy?: Prisma.SortOrder) {
  switch (sortBy) {
    case SortBy.DUE_DATE:
      return { dueDate: orderBy };
    case SortBy.IS_CHECKED:
      return { isChecked: orderBy };
    case SortBy.CREATED_AT:
      return { createdAt: orderBy };
    case SortBy.UPDATED_AT:
      return { updatedAt: orderBy };
    default:
      return { createdAt: Prisma.SortOrder.asc };
  }
}
export async function createTask(userId: string, taskDto: CreateTaskSchema | CreateTaskMeSchema): Promise<ReadTaskSchema> {
  const task = await prisma.task.create({
    data: {
      title: taskDto.title,
      description: taskDto.description,
      dueDate: notEmpty(taskDto.dueDate) ? dayjs.utc(taskDto.dueDate).toISOString() : undefined,
      tag: taskDto.tag,
      tagColor: taskDto.tagColor,
      user: { 
        connect: { 
          id: userId,
        },
      },
    }
  });

  return new ReadTaskSchema(
    task.id,
    task.userId,
    task.title,
    task.description,
    task.dueDate ? dayjs.utc(task.dueDate).toISOString() : undefined,
    task.isChecked,
    task.tag,
    task.tagColor,
    dayjs.utc(task.createdAt).toISOString(),
    dayjs.utc(task.updatedAt).toISOString(),
  );
}

export async function updateTask(taskId: string, taskDto: UpdateTaskSchema) {
  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      title: notEmpty(taskDto.title) ? taskDto.title! : undefined,
      description: taskDto.description !== undefined  ? taskDto.description : undefined,
      dueDate: notEmpty(taskDto.dueDate) ? dayjs.utc(taskDto.dueDate).toDate() : undefined,
      isChecked: taskDto.isChecked != null ? taskDto.isChecked : undefined,
      tag: taskDto.tag !== undefined ? taskDto.tag : undefined,
      tagColor: taskDto.tagColor !== undefined ? taskDto.tagColor : undefined,
    }
  });

  return new ReadTaskSchema(
    task.id,
    task.userId,
    task.title,
    task.description,
    task.dueDate ? dayjs.utc(task.dueDate).toISOString() : undefined,
    task.isChecked,
    task.tag,
    task.tagColor,
    dayjs.utc(task.createdAt).toISOString(),
    dayjs.utc(task.updatedAt).toISOString(),
  );
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

  return new ReadTaskSchema(
    task.id,
    task.userId,
    task.title,
    task.description,
    task.dueDate ? dayjs.utc(task.dueDate).toISOString() : undefined,
    task.isChecked,
    task.tag,
    task.tagColor,
    dayjs.utc(task.createdAt).toISOString(),
    dayjs.utc(task.updatedAt).toISOString(),
  );
}

export async function readAllTasks(queryParams: TaskReadQuerySchema): Promise<ReadTaskSchema[]> {
  const tasks = await prisma.task.findMany({
    where: {
      tag: queryParams.tag,
      isChecked: queryParams.isChecked ? Boolean(JSON.parse(queryParams.isChecked)) : undefined,
    },
    orderBy: [
      getOrderBy(queryParams.sortBy, queryParams.orderBy)
    ]
  });
  return tasks.map(task => 
    new ReadTaskSchema(
      task.id,
      task.userId,
      task.title,
      task.description,
      task.dueDate ? dayjs.utc(task.dueDate).toISOString() : undefined,
      task.isChecked,
      task.tag,
      task.tagColor,
      dayjs.utc(task.createdAt).toISOString(),
      dayjs.utc(task.updatedAt).toISOString(),
    )
  );
}

export async function readAllTasksByUser(userId: string, queryParams: TaskReadQuerySchema): Promise<ReadTaskSchema[]> {
  const tasks = await prisma.task.findMany({
    where: {
      userId: userId,
      tag: queryParams.tag,
      isChecked: queryParams.isChecked ? Boolean(JSON.parse(queryParams.isChecked)) : undefined,
    },
    orderBy: [
      getOrderBy(queryParams.sortBy, queryParams.orderBy)
    ]
  });

  return tasks.map(task => 
    new ReadTaskSchema(
      task.id,
      task.userId,
      task.title,
      task.description,
      task.dueDate ? dayjs.utc(task.dueDate).toISOString() : undefined,
      task.isChecked,
      task.tag,
      task.tagColor,
      dayjs(task.createdAt).toISOString(),
      dayjs(task.updatedAt).toISOString(),
    )
  );
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

  return new ReadTaskSchema(
    taskNow.id,
    taskNow.userId,
    taskNow.title,
    taskNow.description,
    taskNow.dueDate ? dayjs.utc(taskNow.dueDate).toISOString() : undefined,
    taskNow.isChecked,
    taskNow.tag,
    taskNow.tagColor,
    dayjs.utc(taskNow.createdAt).toISOString(),
    dayjs.utc(taskNow.updatedAt).toISOString(),
  );
}

