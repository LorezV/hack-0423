import { FastifyInstance, FastifyRequest } from 'fastify';

export function setUserHook(instance: FastifyInstance) {
  instance.addHook('onRequest', async (request: FastifyRequest) => {
    const { tokenService, userService } = instance.dependencies.services;

    let token = request.headers.authorization;
    if (token) {
      token = token.replaceAll('Bearer ', '');
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
