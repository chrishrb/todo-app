import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function checkPassword(input_password: string, db_password: string): Promise<boolean> {
  const result: [{check_password: boolean}] = await prisma.$queryRaw`SELECT check_password(${input_password}, ${db_password})`;
  return result[0].check_password;
}
