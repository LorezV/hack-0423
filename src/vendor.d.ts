import { IDependencies } from './interfaces/dependencies';

declare module 'fastify' {
  interface FastifyInstance {
    dependencies: IDependencies;
  }
}
