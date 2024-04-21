import { FastifyInstance, FastifyRequest } from 'fastify';
import { IParams, IResponse } from './interfaces';
import schema from './schema';
import { setUserGuard, setUserHook } from '@hooks';
import { UserType } from '@prisma/client';
import { IUser } from '@interfaces';
import { getError } from '@utils';

export default function (instance: FastifyInstance, options: unknown, done: () => void) {
  setUserHook(instance);
  setUserGuard(instance, [UserType.DELEGATE]);

  async function remove(request: FastifyRequest<{ Params: IParams }>): Promise<IResponse> {
    const { prisma } = instance.dependencies;
    const { id } = request.params;
    const delegate = request.user as IUser;

    let university = await prisma.university.findUnique({
      where: { id },
    });
    if (university?.delegate_id !== delegate.id) {
      throw getError(401, 'Forbidden');
    }

    university = await prisma.university.delete({ where: { id, delegate_id: delegate.id } });

    return {
      data: university,
    };
  }

  instance.delete('/', { schema }, remove);
  done();
}
