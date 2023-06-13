import { Language, PrismaClient } from '@prisma/client'

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
              title: "Learn typescript", 
              description: "You need typescript in your future, so learn it now", 
              dueDate: null,
              tag: 'study'
            },
            { 
              title: "Study project for full stack", 
              description: "Finish project", 
              dueDate: new Date(2023, 6, 9, 12, 0).toISOString(),
              tag: 'study'
            }
          ]
        }
      }
    },
  });

  const john = await prisma.user.create({
    data:
    {
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
