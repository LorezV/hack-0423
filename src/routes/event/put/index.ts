import { FastifyInstance, FastifyRequest } from 'fastify';
import { IBody } from './interface';
import schema from './schema';

export default (instance: FastifyInstance, options: unknown, done: () => void) => {
  async function put(request: FastifyRequest<{ Params: { id: number }; Body: IBody }>) {
    const { eventService } = instance.dependencies.services;
    const id = request.params.id;

    return eventService.update(request.body, id);
  }

  instance.put('/', { schema }, put);
  done();
};
