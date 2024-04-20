import { PrismaClient } from '@prisma/client';
import { getError } from '@utils';
import { EventService } from './event.service';

export class ParticipitionService {
  constructor(private readonly prisma: PrismaClient, private readonly eventService: EventService) {}

  async send(eventId: number) {
    // TODO get user_if from req headers
    const user_id = 4;
    const optionalEvent = await this.eventService.get(eventId);

    if (!optionalEvent) {
      return getError(404, `Event with id ${eventId} not found`, {});
    }

    return await this.prisma.participation.create({
      data: {
        user_id,
        event_id: optionalEvent.id,
        reward: optionalEvent.type.reward,
      },
    });
  }

  async apply(id: number, approved: boolean) {
    const optionalParticipition = await this.get(id);

    if (!optionalParticipition) {
      return getError(404, `Participition with id ${id} not found`, {});
    }

    return await this.prisma.participation.update({
      where: { id },
      data: {
        approved,
      },
    });
  }

  async get(id: number) {
    return await this.prisma.participation.findFirst({ where: { id } });
  }
}
