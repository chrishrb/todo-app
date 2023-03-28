import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const root = await prisma.user.upsert({
    where: { email: 'root@example.com' },
    update: {},
    create: {
      email: 'root@example.com',
      password: 'root',
      firstName: 'Root',
      lastName: '',
      isAdmin: true,
    },
  })
  const john = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      email: 'john.doe@example.com',
      password: 'johni',
      firstName: 'John',
      lastName: 'Doe',
    },
  })
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
