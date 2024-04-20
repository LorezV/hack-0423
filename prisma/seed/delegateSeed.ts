import { PrismaClient, UserType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const delegates = [
  {
    id: 1,
    firstname: 'Ректор',
    lastname: 'ОГУ',
    password: 'rector1234',
    email: 'rector@osu.ru',
    type: UserType.DELEGATE,
  },
  {
    id: 2,
    firstname: 'Ректор',
    lastname: 'ОГАУ',
    password: 'rector1234',
    email: 'rector@osau.ru',
    type: UserType.DELEGATE,
  },
  {
    id: 3,
    firstname: 'Ректор',
    lastname: 'ОГПУ',
    password: 'rector1234',
    email: 'rector@ospu.ru',
    type: UserType.DELEGATE,
  },
];

export async function DelegateSeed() {
  try {
    await Promise.all(
      delegates.map(async (delegate) => {
        const { id, ...data } = delegate;

        await prisma.user.upsert({
          where: { id },
          create: {
            id,
            ...data,
            password: await bcrypt.hash(data.password, 10),
          },
          update: {
            ...data,
          },
        });
      }),
    );
    console.log('Delegate seed completed successfully');
  } catch (error) {
    console.error('Delegate seed failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}
