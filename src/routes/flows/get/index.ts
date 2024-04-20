import { FastifyInstance, FastifyRequest } from 'fastify';
import schema from './schema';
import { IQuerystring, IResponse } from './interfaces';

export default function (instance: FastifyInstance, options: unknown, done: () => void) {
  async function get(request: FastifyRequest<{ Querystring: IQuerystring }>): Promise<IResponse> {
    const { prisma } = instance.dependencies;

    const limit = request.query.limit || 20;
    const page = request.query.page || 0;
    const offset = page * limit;

    const where = {
      name: {
        contains: request.query.search,
      },
      department_id: request.query.department_id,
    };

    const flows = await prisma.flow.findMany({
      where,
      skip: offset,
      take: limit,
    });

    const totalRecords = await prisma.flow.count({ where });

    return {
      data: {
        flows,
        total_records: totalRecords,
        total_pages: Math.floor(totalRecords / limit) + 1,
      },
    };
  }

  instance.get('/', { schema }, get);
  done();
}
