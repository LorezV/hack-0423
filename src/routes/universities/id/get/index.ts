import { FastifyInstance, FastifyRequest } from 'fastify';
import { IParams, IResponse } from './interfaces';
import schema from './schema';
import { getError } from '@utils';

export default function (instance: FastifyInstance, options: unknown, done: () => void) {
  async function get(request: FastifyRequest<{ Params: IParams }>): Promise<IResponse> {
    const { prisma } = instance.dependencies;

    const { id } = request.params;

    const university = await prisma.university.findUnique({
      where: { id },
    });
    if (!university) {
      throw getError(404, 'UNIVERSITY_NOT_FOUND');
    }

    return {
      data: university,
    };
  }

  instance.get('/', { schema }, get);
  done();
}
