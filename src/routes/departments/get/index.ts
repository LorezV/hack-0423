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
      faculty_id: request.query.faculty_id,
    };

    const departments = await prisma.department.findMany({
      where,
      skip: offset,
      take: limit,
    });

    const totalRecords = await prisma.department.count({ where });

    return {
      data: {
        departments,
        total_records: totalRecords,
        total_pages: Math.floor(totalRecords / limit) + 1,
      },
    };
  }

  instance.get('/', { schema }, get);
  done();
}
