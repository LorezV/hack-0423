import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const flows = [{ name: '22-ПиНЖ(б) РПиС', department_id: 1 }];

export async function FlowSeed() {
  try {
    await Promise.all(
      flows.map(async (flow) => {
        const { department_id, ...data } = flow;

        await prisma.flow.upsert({
          where: { name: data.name },
          create: {
            ...data,
            department_id,
          },
          update: {
            ...data,
          },
        });
      }),
    );

    console.log('Flow seed completed successfully');
  } catch (error) {
    console.error('Flow seed failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}
