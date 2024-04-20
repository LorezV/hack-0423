import { IUpdateEvent } from '@interfaces';
import { PrismaClient } from '@prisma/client';
import { getError } from '@utils';
import { IBody } from 'src/routes/event/post/interface';

const eventSelect = {
  id: true,
  title: true,
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
        university: {
          connect: {
            id: university_id,
          },
        },
        type: {
          connect: {
            id: type_id,
          },
        },
      },
      select: eventSelect,
    });
  }

  async sendVaccancy(id: number) {
    // TODO get user_if from req headers
    const user = 5;
    const optionalEvent = await this.get(id);

    if (!optionalEvent) {
      return getError(404, `Event with id ${id} not found`, {});
    }

    return await this.prisma.participation.create({
      data: {
        user_id: 5,
        event_id: optionalEvent.id,
        reward: optionalEvent.type.reward,
      },
    });
  }

  async applyVaccancy(participationId: number) {
    
  }

  async get(id: number) {
    return await this.prisma.event.findFirst({
      where: { id },
      select: eventSelect,
    });
  }

  async update(body: IUpdateEvent, id: number) {
    const { title, content } = body;
    const optionalEvent = await this.get(id);

    if (!optionalEvent) {
      return getError(404, `Event with id ${id} not found`, {});
    }

    return await this.prisma.event.update({
      where: { id },
      data: {
        title,
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
