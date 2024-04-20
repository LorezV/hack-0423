import { UserType } from '@prisma/client';
import { getError } from '@utils';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export function setUserGuard(instance: FastifyInstance, types?: UserType[]) {
  instance.addHook(
    'preHandler',
    (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
      if (!request.user) {
        throw getError(401, 'UNAUTHORIZED');
      }

      if (types && !types.includes(request.user.type)) {
        throw getError(403, 'FORBIDDEN');
      }

      done();
    },
  );
}
