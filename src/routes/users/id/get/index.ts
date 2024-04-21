import { IUser } from '@interfaces';
import { getError } from '@utils';
import { FastifyInstance, FastifyRequest } from 'fastify';
import schema from './schema';

export default function (instance: FastifyInstance, options: unknown, done: () => void) {
  async function get(request: FastifyRequest<{ Params: { id: number } }>): Promise<IUser> {
    const { userService } = instance.dependencies.services;
    const id = request.params.id;

    const optionalUser = await userService.findByID(id);

    if (!optionalUser) {
      throw getError(404, 'User is undefined');
    }

    return optionalUser;
  }

  instance.get('/', { schema }, get);
  done();
}
