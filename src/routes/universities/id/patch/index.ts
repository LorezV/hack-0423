import { FastifyInstance, FastifyRequest } from 'fastify';
import { IBody, IParams, IResponse } from './interfaces';
import schema from './schema';
import { getError } from '@utils';
import { setUserGuard, setUserHook } from '@hooks';
import { UserType } from '@prisma/client';

export default function (instance: FastifyInstance, options: unknown, done: () => void) {
  setUserHook(instance);
  setUserGuard(instance, [UserType.DELEGATE]);

  async function patch(
    request: FastifyRequest<{ Body: IBody; Params: IParams }>,
  ): Promise<IResponse> {
    const { prisma } = instance.dependencies;
    const delegate = request.user;

    let university = await prisma.university.findUnique({
      where: { id: request.params.id },
    });

    if (!university) {
      throw getError(404, 'UNIVERSITY_NOT_FOUND');
    }

    if (university.delegate_id !== delegate?.id) {
      throw getError(403, 'FORBIDDEN');
    }

    university = await prisma.university.update({
      where: { id: request.params.id, delegate_id: delegate.id },
      data: {
        name: request.body.name || undefined,
        content: request.body.content || undefined,
        city_id: request.body.city_id || undefined,
      },
    });

    return {
      data: university,
    };
  }

  instance.patch('/', { schema }, patch);
  done();
}
