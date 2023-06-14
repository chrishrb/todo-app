import { PrismaClient } from "@prisma/client";
import { CreateTagSchema, ReadTagSchema, UpdateTagSchema } from "../schemas/tag.schema";
import { NotFoundError } from "../exceptions/errors/not-found-error";
import { notEmpty } from "../exceptions/helpers";

const prisma = new PrismaClient();

export async function createTag(tagDto: CreateTagSchema): Promise<ReadTagSchema> {
  const tag = await prisma.tag.create({
    data: {
      name: tagDto.name,
    }
  });

  return new ReadTagSchema(tag.id, tag.name);
}

export async function updateTag(tagId: string, tagDto: UpdateTagSchema) {
  const tag = await prisma.tag.update({
    where: {
      id: tagId,
    },
    data: {
      name: notEmpty(tagDto.name) ? tagDto.name! : undefined,
    }
  });

  return new ReadTagSchema(tag.id, tag.name);
}

export async function readTag(tagId: string): Promise<ReadTagSchema> {
  const tag = await prisma.tag.findUnique({
    where: {
      id: tagId,
    }
  });

  if (tag == null) {
    throw new NotFoundError([{field: 'id', value: tagId, replyMessage: `Tag with id ${tagId} not found.`}])
  }

  return new ReadTagSchema(tag.id, tag.name);
}

export async function readAllTags(): Promise<ReadTagSchema[]> {
  const tags = await prisma.tag.findMany();
  return tags.map(tag => new ReadTagSchema(tag.id, tag.name));
}

export async function deleteTag(tagId: string): Promise<void> {
  await prisma.tag.delete({
    where: {
      id: tagId,
    }
  });
}