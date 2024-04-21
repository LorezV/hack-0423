import { getError } from '@utils';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { IBody, IParams, IResponse } from './interfaces';
import schema from './schema';
import { setUserGuard, setUserHook } from '@hooks';
import { IUser } from '@interfaces';

export default function (instance: FastifyInstance, options: unknown, done: () => void) {
  setUserHook(instance);
  setUserGuard(instance);

  async function patch(
    request: FastifyRequest<{ Params: IParams; Body: IBody }>,
  ): Promise<IResponse> {
    const { prisma } = instance.dependencies;
    const { id } = request.params;
    const data = request.body;
    const sender = request.user as IUser;

    let user = await prisma.user.findUnique({ where: { id: request.params.id } });
    if (!user) {
      throw getError(404, 'USER_NOT_FOUND');
    }

    if (user.id !== sender?.id) {
      throw getError(403, 'FORBIDDEN');
    }

    user = await prisma.user.update({
      where: { id },
      data,
    });

    return {
      data: user,
    };
  }

  instance.patch('/', { schema }, patch);
  done();
}
