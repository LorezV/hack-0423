import { FastifySchema } from 'fastify';
import { flowSchema } from '@schemas';

const schema: FastifySchema = {
  tags: ['Потоки'],
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'number' },
      limit: { type: 'number' },
      search: { type: 'string' },
      department_id: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            flows: {
              type: 'array',
              items: flowSchema,
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
  },
};

export default schema;
