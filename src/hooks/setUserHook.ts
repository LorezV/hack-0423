import { FastifyInstance, FastifyRequest } from 'fastify';

export function setUserHook(instance: FastifyInstance) {
  instance.addHook('preHandler', async (request: FastifyRequest) => {
    const { tokenService, userService } = instance.dependencies.services;

    const token = request.headers.authorization;
    if (token) {
      const payload = tokenService.getAccessTokenPayload(token);
      if (payload) {
        const resolverToken = await tokenService.resolveToken(token);
        if (resolverToken) {
          request.user = await userService.findByID(payload.userID);
          return;
        }
      }
    }

    request.user = null;
  });
}
