import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const eventTypes = [
  { name: 'спорт', reward: 2 },
  { name: 'наука', reward: 5 },
  { name: 'творчество', reward: 4 },
  { name: 'волонтерство', reward: 3 },
];

export async function EventTypeSeed() {
  try {
    await Promise.all(
      eventTypes.map(async (eventType) => {
        const { name, ...data } = eventType;

        await prisma.eventType.upsert({
          where: { name },
          create: {
            name,
            ...data,
          },
          update: {
            ...data,
          },
        });
      }),
    );

    console.log('EventType seed completed successfully');
  } catch (error) {
    console.error('EventType seed failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}
