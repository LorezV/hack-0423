import { FastifyInstance, FastifyRequest } from 'fastify';
import { IBody } from './interface';
import schema from './schema';

export default async (instance: FastifyInstance) => {
  async function post(request: FastifyRequest<{ Body: IBody }>) {
    const { eventService } = instance.dependencies.services;

    return eventService.create(request.body);
  }

  instance.post('/', { schema }, post);
};
