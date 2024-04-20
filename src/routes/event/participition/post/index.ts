import { setUserGuard, setUserHook } from '@hooks';
import { IUser } from '@interfaces';
import { FastifyInstance, FastifyRequest } from 'fastify';
import schema from './schema';

export default (instance: FastifyInstance, options: unknown, done: () => void) => {
  setUserHook(instance);
  setUserGuard(instance);

  async function post(request: FastifyRequest<{ Params: { eventId: number } }>) {
    const { participationService } = instance.dependencies.services;
    const eventId = request.params.eventId;
    const user = request.user as IUser;

    return await participationService.send(eventId, user.id);
  }

  instance.post('/', { schema }, post);
  done();
};
