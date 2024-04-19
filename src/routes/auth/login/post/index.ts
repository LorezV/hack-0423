import { FastifyInstance, FastifyRequest } from 'fastify';
import { IBody, TResponse } from './interfaces';
import { getError } from '@utils';
import schema from './schema';
import bcrypt from 'bcrypt';

export default async (instance: FastifyInstance) => {
  async function post(request: FastifyRequest<{ Body: IBody }>): Promise<TResponse> {
    const { email, password } = request.body;
    const { userService, tokenService } = instance.dependencies.services;

    const user = await userService.findByEmail(email);
    if (!user) {
      throw getError(404, 'User not exists', null);
    }

    if (!(await bcrypt.compare(password, user.password as string))) {
      throw getError(400, 'Email or password incorrect', null);
    }

    const token = await tokenService.upsertToken(
      {
        user_id: user.id,
        user_group: user.group?.name || null,
        user_permissions: user.group?.permissions.map((p) => p.name) || [],
      },
      null,
    );

    return {
      ...user,
      tokens: [...user.tokens, token],
    };
  }

  instance.post('/', { schema }, post);
};
