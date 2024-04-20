import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const faculties = [{ name: 'ПОВТАС', faculty_id: 1 }];

export async function DepartmentSeed() {
  try {
    await Promise.all(
      faculties.map(async (faculty) => {
        const { faculty_id, ...data } = faculty;

        await prisma.department.upsert({
          where: { name: data.name },
          create: {
            ...data,
            faculty_id,
          },
          update: {
            ...data,
          },
        });
      }),
    );

    console.log('Department seed completed successfully');
  } catch (error) {
    console.error('Department seed failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}
