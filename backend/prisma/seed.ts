import { Language, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const root = await prisma.user.create({
    data:
    {
      email: 'root@example.com',
      password: 'root',
      firstName: 'Root',
      lastName: '',
      language: undefined,
      isAdmin: true,
      Tasks: {
        createMany: {
          data: [
            { 
              title: "Learn typescript", 
              description: "You need typescript in your future, so learn it now", 
              dueDate: null 
            },
            { 
              title: "Study project for full stack", 
              description: "Finish project", 
              dueDate: new Date(2023, 6, 9, 12, 0).toISOString() 
            }
          ]
        }
      }
    },
  });

  const john = await prisma.user.create({
    data:
    {
      email: 'john.doe@example.com',
      password: 'johni',
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


  console.log(root, john)
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
