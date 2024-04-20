import { PrismaClient } from '@prisma/client';
import cities from './cities.json';

const prisma = new PrismaClient();

export async function CitySeed() {
  for (const city of cities) {
    await prisma.city.upsert({
      where: { name: city.name },
      create: {
        name: city.name,
      },
      update: {
        name: city.name,
      },
    });
  }
}
