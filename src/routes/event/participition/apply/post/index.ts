import { FastifyInstance, FastifyRequest } from 'fastify';
import { IBody } from './interface';
import schema from './schema';

export default (instance: FastifyInstance, options: unknown, done: () => void) => {
  async function post(
    request: FastifyRequest<{ Params: { participationId: number }; Body: IBody }>,
  ) {
    const { participationService } = instance.dependencies.services;
    const participationId = request.params.participationId;
    const { approved } = request.body;

    return participationService.apply(participationId, approved);
  }

  instance.post('/', { schema }, post);
  done();
};
