import { PrismaClient } from '@prisma/client';
import cities from './data/cities.json';

export default async (prisma: PrismaClient) => {
  for (const city of cities) {
    await prisma.city.upsert({
      where: { name: city.name },
      update: {},
      create: { name: city.name },
    });
  }
};
