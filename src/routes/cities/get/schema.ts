import { citySchema } from '@schemas';
import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Города'],
  querystring: {
    type: 'object',
    properties: {
      limit: { type: 'number' },
      page: { type: 'number' },
      search: { type: 'string' },
    },
  },
  response: {
    200: {
      data: {
        type: 'object',
        properties: {
          cities: {
            type: 'array',
            items: citySchema,
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
