import { FastifyInstance, FastifyRequest } from 'fastify';
import { IBody, TResponse } from './interfaces';
import { getError } from '@utils';
import schema from './schema';

export default (instance: FastifyInstance, options: unknown, done: () => void) => {
  async function post(request: FastifyRequest<{ Body: IBody }>): Promise<TResponse> {
    const { userService, tokenService } = instance.dependencies.services;

    const { email, password } = request.body;

    const user = await userService.findByEmail(email);
    if (!user) {
      throw getError(404, 'USER_NOT_FOUND');
    }

    if (password !== user.password) {
      throw getError(400, 'INVALID_CREDENTIALS');
    }

    const token = await tokenService.createToken(
      {
        userID: user.id,
        userType: user.type,
      },
      null,
    );

    return {
      data: token,
    };
  }

  instance.post('/', { schema }, post);
  done();
};
