import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const flows = [{ name: '22-ПиНЖ(б) РПиС', department: 'ПОВТАС' }];

export async function FlowSeed() {
  try {
    await Promise.all(
      flows.map(async (flow) => {
        const { department, ...data } = flow;
        const optionalDepartment = await prisma.department.findFirst({
          where: { name: department },
        });

        if (optionalDepartment) {
          await prisma.flow.upsert({
            where: { name: data.name },
            create: {
              ...data,
              department_id: optionalDepartment.id,
            },
            update: {
              ...data,
            },
          });
        }
      }),
    );

    console.log('Flow seed completed successfully');
  } catch (error) {
    console.error('Flow seed failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}
