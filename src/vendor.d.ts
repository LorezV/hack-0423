import { IDependencies } from './interfaces/utils/dependencies';

declare module 'fastify' {
  interface FastifyInstance {
    dependencies: IDependencies;
  }
}
