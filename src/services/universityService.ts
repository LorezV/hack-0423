import { IGroup, Nullable } from '@interfaces';
import { PrismaClient } from '@prisma/client';

export class UniversityService {
  constructor(private readonly prisma: PrismaClient) {}

  async findGroupById(id: number): Promise<Nullable<IGroup>> {
    return this.prisma.group.findUnique({
      where: { id },
    });
  }
}
