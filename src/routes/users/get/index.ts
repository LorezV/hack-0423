import { FastifyInstance, FastifyRequest } from 'fastify';
import { IQuerystring, IResponse } from './interfaces';
import schema from './schema';

export default function (instance: FastifyInstance, options: unknown, done: () => void) {
  async function get(request: FastifyRequest<{ Querystring: IQuerystring }>): Promise<IResponse> {
    const { prisma } = instance.dependencies;

    const limit = request.query.limit || 20;
    const page = request.query.page || 0;
    const offset = page * limit;

    const where: {
      OR?: {
        firstname?: { contains: string };
        lastname?: { contains: string };
      }[];
    } = {};

    if (request.query.search) {
      where.OR = [];
      request.query.search.split(' ').forEach((word) => {
        where.OR?.push({ firstname: { contains: word } });
        where.OR?.push({ lastname: { contains: word } });
      });
    }

    const users = await prisma.user.findMany({
      where,
      skip: offset,
      take: limit,
    });

    const totalRecords = await prisma.user.count({ where });

    return {
      data: {
        users,
        total_records: totalRecords,
        total_pages: Math.floor(totalRecords / limit) + 1,
      },
    };
  }

  instance.get('/', { schema }, get);
  done();
}