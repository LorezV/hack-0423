import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const faculties = [{ name: 'ИМИТ', university_id: 1 }];

export async function FacultySeed() {
  try {
    await Promise.all(
      faculties.map(async (faculty) => {
        const { university_id, ...data } = faculty;

        await prisma.faculty.upsert({
          where: { name: data.name },
          create: {
            ...data,
            university_id,
          },
          update: {
            ...data,
          },
        });
      }),
    );

    console.log('Faculty seed completed successfully');
  } catch (error) {
    console.error('Faculty seed failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}
