import { IUpdateEvent } from '@interfaces';
import { PrismaClient } from '@prisma/client';
import { getError } from '@utils';
import { IBody } from 'src/routes/event/post/interface';

const eventSelect = {
  id: true,
  name: true,
  content: true,
  started_at: true,
  finished_at: true,
  type: true,
  university: true,
};

export class EventService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(body: IBody) {
    const { type_id, university_id, ...data } = body;

    return await this.prisma.event.create({
      data: {
        ...data,
        university_id,
        type_id: type_id,
      },
      select: eventSelect,
    });
  }

  async get(id: number) {
    return await this.prisma.event.findFirst({
      where: { id },
      select: eventSelect,
    });
  }

  async update(body: IUpdateEvent, id: number) {
    const { name, content } = body;
    const optionalEvent = await this.get(id);

    if (!optionalEvent) {
      return getError(404, `Event with id ${id} not found`, {});
    }

    return await this.prisma.event.update({
      where: { id },
      data: {
        name,
        content,
      },
      select: eventSelect,
    });
  }

  async remove(id: number) {
    const optionalEvent = await this.get(id);

    if (!optionalEvent) {
      return getError(404, `Event with id ${id} not found`, {});
    }

    return await this.prisma.event.delete({ where: { id } });
  }
}
