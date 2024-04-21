import { ICreateUserInput, IUser, Nullable } from '@interfaces';
import { PrismaClient } from '@prisma/client';
import { getError } from '@utils';
import bcrypt from 'bcrypt';

export class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  async createUser(input: ICreateUserInput): Promise<IUser> {
    const { email, password, firstname, lastname, type } = input;

    const candidate = await this.findByEmail(email);
    if (candidate) {
      throw getError(409, 'USER_ALREADY_EXISTS');
    }

    const user = await this.prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash(password, 4),
        firstname,
        lastname,
        type,
        group_id: input.group_id,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<Nullable<IUser>> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByID(id: number): Promise<Nullable<IUser>> {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }
}
