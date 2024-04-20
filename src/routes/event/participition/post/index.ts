import { FastifyInstance, FastifyRequest } from 'fastify';
import schema from './schema';

export default async (instance: FastifyInstance) => {
  async function post(request: FastifyRequest<{ Params: { eventId: number } }>) {
    const { participationService } = instance.dependencies.services;
    const eventId = request.params.eventId;

    return participationService.send(eventId);
  }

  instance.post('/', { schema }, post);
};
