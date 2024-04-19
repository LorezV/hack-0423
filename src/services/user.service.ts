import {
  IUserService,
  IUser,
  Nullable,
  TUserWithGroup,
  TUserWithPermissions,
  TUserWithTokens,
} from '@interfaces';
import { PrismaClient } from '@prisma/client';
import { getError } from '@utils';
import bcrypt from 'bcrypt';

export class UserService implements IUserService {
  constructor(private readonly prisma: PrismaClient) {}

  async createUser(email: string, password: string): Promise<IUser> {
    let user: Nullable<IUser> = await this.prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      throw getError(409, 'User already exist', null);
    }

    user = await this.prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash(password, 10),
      },
    });

    return user;
  }

  async findById(id: number): Promise<Nullable<TUserWithPermissions & TUserWithTokens>> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        tokens: true,
        group: {
          include: {
            permissions: true,
          },
        },
      },
    });
  }

  async findByEmail(email: string): Promise<Nullable<TUserWithPermissions & TUserWithTokens>> {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        tokens: true,
        group: {
          include: {
            permissions: true,
          },
        },
      },
    });
  }
}
