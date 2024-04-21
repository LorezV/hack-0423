import { FastifyInstance, FastifyRequest } from 'fastify';
import schema from './schema';
import { IQuerystring, IResponse } from './interfaces';

export default (instance: FastifyInstance, options: unknown, done: () => void) => {
  async function get(request: FastifyRequest<{ Querystring: IQuerystring }>): Promise<IResponse> {
    const { prisma } = instance.dependencies;

    const limit = request.query.limit || 20;
    const page = request.query.page || 0;
    const offset = page * limit;

    const cities = await prisma.city.findMany();

    const totalRecords = await prisma.city.count();

    return {
      data: {
        cities,
        total_records: totalRecords,
        total_pages: Math.floor(totalRecords / limit) + 1,
      },
    };
  }

  instance.get('/', { schema }, get);
  done();
};
