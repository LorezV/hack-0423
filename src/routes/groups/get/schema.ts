import { FastifySchema } from 'fastify';
import { groupSchema } from '@schemas';

const schema: FastifySchema = {
  tags: ['Группы'],
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'number' },
      limit: { type: 'number' },
      search: { type: 'string' },
      flow_id: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            groups: {
              type: 'array',
              items: groupSchema,
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
