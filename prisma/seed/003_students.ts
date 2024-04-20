import { PrismaClient, UserType } from '@prisma/client';
import students from './data/students.json';
import bcrypt from 'bcrypt';

export default async (prisma: PrismaClient) => {
  const groups = await prisma.group.findMany();

  for (const student of students) {
    await prisma.user.upsert({
      where: { email: student.email },
      update: {},
      create: {
        firstname: student.firstname,
        lastname: student.lastname,
        email: student.email,
        password: await bcrypt.hash(student.password, 4),
        type: UserType.STUDENT,
        group_id: groups[Math.ceil(Math.random() * (groups.length - 1))].id,
      },
    });
  }
};
