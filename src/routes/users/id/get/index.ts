import { getError } from '@utils';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { IParams, IResponse } from './interfaces';
import schema from './schema';

export default function (instance: FastifyInstance, options: unknown, done: () => void) {
  async function get(request: FastifyRequest<{ Params: IParams }>): Promise<IResponse> {
    const { prisma } = instance.dependencies;

    const user = await prisma.user.findUnique({
      where: { id: request.params.id },
      include: {
        group: {
          include: {
            flow: {
              include: {
                department: {
                  include: {
                    faculty: {
                      include: {
                        university: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        university: true,
      },
    });
    
    if (!user) {
      throw getError(404, 'USER_NOT_FOUND');
    }

    return {
      data: user,
    };
  }

  instance.get('/', { schema }, get);
  done();
}
