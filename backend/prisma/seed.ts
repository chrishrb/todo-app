import { PrismaClient } from '@prisma/client'
import * as user_service from '../src/services/user.service'
import { v4 as uuid } from 'uuid'

const prisma = new PrismaClient()

async function main() {
  const root = await user_service.createUser({ email: 'root@example.com', password: 'root', firstName: 'Root', lastName: '' })
  await user_service.setAsAdmin(root.id);

  const john = await user_service.createUser({ email: 'john.doe@example.com', password: 'johni', firstName: 'John', lastName: 'Doe' })
  console.log({ root, john })

  const task1Id = uuid()
  const task1 = await prisma.task.upsert({
    where: { id: task1Id },
    update: {},
    create: {
      id: task1Id,
      title: 'implement easter eggs',
      description: '',
      dueDate: new Date("2023-05-12"),
      user: {
        connect: { id: root.id }
      }
    },
  })

  const task2Id = uuid()
  const task2 = await prisma.task.upsert({
    where: { id: task2Id },
    update: {},
    create: {
      id: task2Id,
      title: 'read "zero to production in Rust"',
      description: 'because Rust is obvisouly superior. Arch btw',
      dueDate: new Date("2023-06-27"),
      user: {
        connect: { id: john.id }
      }
    },
  })
  console.log({ task1, task2 })
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
