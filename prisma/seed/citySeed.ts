import { PrismaClient } from '@prisma/client';
import cities from './cities.json';

const prisma = new PrismaClient();

export async function CitySeed() {
  try {
    await Promise.all(
      cities.map((city) => {
        prisma.city.upsert({
          where: { name: city.name },
          create: {
            name: city.name,
          },
          update: {
            name: city.name,
          },
        });
      }),
    );
    console.log('City seed completed successfully');
  } catch (error) {
    console.error('City seed failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}
