import { PrismaClient, UserType } from '@prisma/client';
import delegates from './data/delegates.json';
import bcrypt from 'bcrypt';

export default async (prisma: PrismaClient) => {
  for (const delegate of delegates) {
    await prisma.user.upsert({
      where: { email: delegate.email },
      update: {},
      create: {
        firstname: delegate.firstname,
        lastname: delegate.lastname,
        email: delegate.email,
        password: await bcrypt.hash(delegate.password, 4),
        type: UserType.DELEGATE,
      },
    });
  }
};
