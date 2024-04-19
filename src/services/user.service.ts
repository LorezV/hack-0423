import { PrismaClient } from '@prisma/client';
import { getError } from '@utils';
import bcrypt from 'bcrypt';

export class UserService {
  constructor(private readonly prisma: PrismaClient) {}
}
