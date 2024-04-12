import { PrismaClient } from '@prisma/client';

export function initPrisma() {
  return new PrismaClient();
}
