import { Language, PrismaClient } from '@prisma/client'
import * as user_service from '../src/services/user.service'
import * as task_service from '../src/services/task.service'

const prisma = new PrismaClient()

async function main() {
  const root = await user_service.createUser({ email: 'root@example.com', password: 'root', firstName: 'Root', lastName: '', language: null })
  await user_service.setAsAdmin(root.id);

  const john = await user_service.createUser({ email: 'john.doe@example.com', password: 'johni', firstName: 'John', lastName: 'Doe', language: Language.DE_DE })
  console.log({ root, john })

  const task1 = await task_service.createTask(root.id, {title: "Learn typescript", description: "You need typescript in your future, so learn it now", dueDate: null})
  const task2 = await task_service.createTask(john.id, {title: "Study project for full stack", description: "Finish project", dueDate: new Date(2023, 6, 9, 12, 0).toISOString()})
  const task3 = await task_service.createTask(john.id, {title: "Presentation for full stack", description: null, dueDate: new Date(2023, 6, 10).toISOString()})
  console.log({task1, task2, task3})
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
