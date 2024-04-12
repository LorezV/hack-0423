import { FastifyInstance, FastifyRequest } from 'fastify';
import schema from './schema';
import { IBody, TResponse } from './interfaces';

export default async (instance: FastifyInstance) => {
  async function post(request: FastifyRequest<{ Body: IBody }>): Promise<TResponse> {
    const { tokenService, userService } = instance.dependencies.services;
    const { email, password } = request.body;

    const user = await userService.createUser(email, password);
    const token = await tokenService.upsertToken(
      {
        user_id: user.id,
        user_group: null,
        user_permissions: null,
      },
      null,
    );

    delete user.password;

    return {
      ...user,
      tokens: [token],
    };
  }

  instance.post('/', { schema }, post);
};
