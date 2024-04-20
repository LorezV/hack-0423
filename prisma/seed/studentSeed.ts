import { PrismaClient, UserType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const students = [
  {
    id: 4,
    firstname: 'Ранил',
    lastname: 'ПуссиДестроер2004',
    password: '123456',
    email: 'ranilka@piton_govno.ru',
    type: UserType.STUDENT,
    university: 'ОГУ',
  },
];

export async function StudentSeed() {
  try {
    await Promise.all(
      students.map(async (student) => {
        const { id, university, ...data } = student;
        const optionalUniversity = await prisma.university.findFirst({
          where: { name: university },
        });

        await prisma.user.upsert({
          where: { id },
          create: {
            id,
            ...data,
            university: {
              connect: { id: optionalUniversity?.id },
            },
            password: await bcrypt.hash(data.password, 10),
          },
          update: {
            ...data,
          },
        });
      }),
    );
    console.log('Student seed completed successfully');
  } catch (error) {
    console.error('Student seed failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}
