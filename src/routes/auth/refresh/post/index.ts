import { FastifyInstance, FastifyRequest } from 'fastify';
import { IBody, TResponse } from './interfaces';
import { getError } from '@utils';
import schema from './schema';

export default (instance: FastifyInstance, options: unknown, done: () => void) => {
  async function post(request: FastifyRequest<{ Body: IBody }>): Promise<TResponse> {
    const { refreshToken } = request.body;
    const { tokenService } = instance.dependencies.services;

    const payload = tokenService.getRefreshTokenPayload(refreshToken);
    if (!payload) {
      throw getError(400, 'INVALID_TOKEN');
    }

    const oldToken = await tokenService.resolveToken(refreshToken);
    if (!oldToken) {
      throw getError(400, 'UNKNOWN_TOKEN');
    }

    return await tokenService.createToken(payload, oldToken.id);
  }

  instance.post('/', { schema }, post);
  done();
};
