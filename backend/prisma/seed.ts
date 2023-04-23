import { PrismaClient } from '@prisma/client'
import * as user_service from '../src/services/user.service'

const prisma = new PrismaClient()

async function main() {
  const root = await user_service.createUser({ email: 'root@example.com', password: 'root', firstName: 'Root', lastName: '' })
  await user_service.setAsAdmin(root.id);

  const john = await user_service.createUser({ email: 'john.doe@example.com', password: 'johni', firstName: 'John', lastName: 'Doe' })
  console.log({ root, john })
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
