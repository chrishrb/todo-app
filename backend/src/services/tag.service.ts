import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../exceptions/errors/not-found-error";

const prisma = new PrismaClient();

export async function getTags(userId: string) {
    const userTags = await prisma.user.findUnique({
        where: {
          id: userId
        },
        select: {
          Tasks: {
            select: {
              tag: true
            },
            where: {
              tag: {
                not: null
              }
            },
            distinct: ["tag"]
          }
        }
      });
      
      if (userTags) {
        const tags = userTags.Tasks.map(task => task.tag);
        return(tags)
      } else {
        throw new NotFoundError([{field: 'id', value: userId, replyMessage: `The user with the id ${userId} has no tags.`}])
    }
  }