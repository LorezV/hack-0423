import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const groups = [{ name: '1', flow: '22-ПиНЖ(б) РПиС' }];

export async function GroupSeed() {
  try {
    await Promise.all(
      groups.map(async (group) => {
        const { flow, ...data } = group;
        const optionalFlow = await prisma.flow.findFirst({
          where: {
            name: flow,
          },
        });

        if (optionalFlow) {
          await prisma.group.upsert({
            where: { name: data.name },
            create: {
              ...data,
              flow_id: optionalFlow.id,
            },
            update: {
              ...data,
            },
          });
        }
      }),
    );

    console.log('Group seed completed successfully');
  } catch (error) {
    console.error('Group seed failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}
