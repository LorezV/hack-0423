import { FastifyInstance, FastifyRequest } from 'fastify';
import schema from './schema';

export default (instance: FastifyInstance) => {
  async function get(request: FastifyRequest<{ Params: { id: number } }>) {
    const { eventService } = instance.dependencies.services;
    const id = request.params.id;

    return eventService.get(id);
  }

  instance.get('/', { schema }, get);
};
