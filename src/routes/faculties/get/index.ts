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
      university_id: request.query.university_id,
    };

    const faculties = await prisma.faculty.findMany({
      where,
      skip: offset,
      take: limit,
    });

    const totalRecords = await prisma.faculty.count({ where });

    return {
      data: {
        faculties,
        total_records: totalRecords,
        total_pages: Math.floor(totalRecords / limit) + 1,
      },
    };
  }

  instance.get('/', { schema }, get);
  done();
}