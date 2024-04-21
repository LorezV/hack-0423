import { userFullSchema } from '@schemas';
import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Пользоватеди'],
  params: {
    id: { type: 'number' },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: userFullSchema,
      },
    },
  },
};

export default schema;
