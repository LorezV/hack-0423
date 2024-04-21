import { FastifyInstance, FastifyRequest } from 'fastify';
import { IBody, IResponse } from './interfaces';
import schema from './schema';

export default function (instance: FastifyInstance, options: unknown, done: () => void) {
  async function post(request: FastifyRequest<{ Body: IBody }>): Promise<IResponse> {}

  instance.post('/', { schema }, post);
  done();
}
