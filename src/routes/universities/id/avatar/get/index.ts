import { FastifyInstance, FastifyRequest } from 'fastify';
import { IParams, IResponse } from './interfaces';
import schema from './schema';
import { getError } from '@utils';

export default function (instance: FastifyInstance, options: unknown, done: () => void) {
  async function get(request: FastifyRequest<{ Params: IParams }>): Promise<IResponse> {
    const { prisma } = instance.dependencies;
    const { id } = request.params;

    const avatar = await prisma.universityAvatar.findUnique({
      where: {
        university_id: id,
      },
    });
    if (!avatar) {
      throw getError(404, 'AVATAR_NOT_FOUND');
    }

    return {
      data: avatar,
    };
  }

  instance.get('/', { schema }, get);
  done();
}
