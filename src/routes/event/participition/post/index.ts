import { FastifyInstance, FastifyRequest } from 'fastify';
import schema from './schema';

export default (instance: FastifyInstance, options: unknown, done: () => void) => {
  async function post(request: FastifyRequest<{ Params: { eventId: number } }>) {
    const { participationService } = instance.dependencies.services;
    const eventId = request.params.eventId;

    return await participationService.send(eventId);
  }

  instance.post('/', { schema }, post);
  done();
};
