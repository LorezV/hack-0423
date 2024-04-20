import { FastifyInstance, FastifyRequest } from 'fastify';
import schema from './schema';

export default (instance: FastifyInstance) => {
  async function remove(request: FastifyRequest<{ Params: { id: number } }>) {
    const { eventService } = instance.dependencies.services;
    const id = request.params.id;

    return eventService.remove(id);
  }

  instance.delete('/', { schema }, remove);
};
