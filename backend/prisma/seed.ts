import { Language, PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const PASSWORD_PLACEHOLDER = '************';
const prisma = new PrismaClient()

async function main() {
  if (process.env.ADMIN_PASSWORD == null) {
    throw new Error("Environment variable ADMIN_PASSWORD not defined.")
  }
  if (process.env.USER_PASSWORD == null) {
    throw new Error("Environment variable USER_PASSWORD not defined.")
  }

  const root = await prisma.user.create({
    data:
    {
      id: 'cc1fcd35-3688-4ac6-b3af-ead6498544f1',
      email: 'admin@todo.com',
      password: process.env.ADMIN_PASSWORD,
      firstName: 'Admin',
      lastName: '',
      language: undefined,
      isAdmin: true,
      Tasks: {
        createMany: {
          data: [
            { 
              id: '129b6589-4404-4efe-9d8c-3b4c46a1ad1d',
              title: "Learn typescript", 
              description: "You need typescript in your future, so learn it now", 
              dueDate: null,
              tag: 'study',
              isChecked: true,
            },
            { 
              id: '1eb81d39-15ae-4d29-a4f1-dc9cd277e60f',
              title: "Study project for full stack", 
              description: "Finish project", 
              dueDate: dayjs('2023-07-09 10:00').utc().format(),
              tag: 'work'
            }
          ]
        }
      }
    },
  });

  const john = await prisma.user.create({
    data:
    {
      id: '5a288c41-83a0-4046-9c63-38a117e4b61a',
      email: 'john.doe@todo.com',
      password: process.env.USER_PASSWORD,
      firstName: 'John',
      lastName: 'Doe',
      language: Language.DE_DE,
      isAdmin: false,
      Tasks: {
        createMany: {
          data: [
            { 
              id: '3f86e4b1-1243-4e5d-b2f9-1da23b7576a4',
              title: "First task", 
              description: "This is a example task", 
              dueDate: null 
            },
          ]
        }
      }
    },
  });


  console.log(
    {...root, ...{ password: PASSWORD_PLACEHOLDER}},
    {...john, ...{ password: PASSWORD_PLACEHOLDER }},
  )
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
