import { Nullable, IUser } from '@interfaces';
import { IDependencies } from './interfaces/dependencies';

declare module 'fastify' {
  interface FastifyInstance {
    dependencies: IDependencies;
  }

  interface FastifyRequest {
    user: Nullable<IUser>;
  }
}
