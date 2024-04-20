import { userSchema } from '@schemas';
import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Пользоватеди'],
  querystring: {
    page: { type: 'number' },
    limit: { type: 'number' },
    search: { type: 'string' },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          users: {
            type: 'array',
            items: userSchema,
          },
          total_records: {
            type: 'number',
          },
          total_pages: {
            type: 'number',
          },
        },
      },
    },
  },
};

export default schema;
