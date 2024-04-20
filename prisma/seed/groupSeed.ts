import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const groups = [{ name: '1', flow_id: 1 }];

export async function GroupSeed() {
  try {
    await Promise.all(
      groups.map(async (group) => {
        const { flow_id, ...data } = group;

        await prisma.group.upsert({
          where: { name: data.name },
          create: {
            ...data,
            flow_id,
          },
          update: {
            ...data,
          },
        });
      }),
    );

    console.log('Group seed completed successfully');
  } catch (error) {
    console.error('Group seed failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}
