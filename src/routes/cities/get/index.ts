import { FastifyInstance, FastifyRequest } from 'fastify';
import schema from './schema';
import { IQuerystring, IResponse } from './interfaces';

export default (instance: FastifyInstance, options: unknown, done: () => void) => {
  async function get(request: FastifyRequest<{ Querystring: IQuerystring }>): Promise<IResponse> {
    const { prisma } = instance.dependencies;

    const cities = await prisma.city.findMany();

    return {
      data: {
        cities,
      },
    };
  }

  instance.get('/', { schema }, get);
  done();
};
