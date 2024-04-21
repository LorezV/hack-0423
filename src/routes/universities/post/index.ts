import { FastifyInstance, FastifyRequest } from 'fastify';
import schema from './schema';
import { setUserGuard, setUserHook } from '@hooks';
import { UserType } from '@prisma/client';
import { IBody, IResponse } from './interfaces';
import { IUser } from '@interfaces';

export default function (instance: FastifyInstance, options: unknown, done: () => void) {
  setUserHook(instance);
  setUserGuard(instance, [UserType.DELEGATE]);

  async function post(request: FastifyRequest<{ Body: IBody }>): Promise<IResponse> {
    const { prisma } = instance.dependencies;
    const delegate = request.user as IUser;

    const { name, content, city_id } = request.body;

    const university = await prisma.university.create({
      data: {
        name,
        content,
        city_id,
        delegate_id: delegate.id,
      },
    });

    return {
      data: university,
    };
  }

  instance.post('/', { schema }, post);
  done();
}