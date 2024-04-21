import { citySchema } from '@schemas';
import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Города'],
  querystring: {
    type: 'object',
    properties: {
      limit: { type: 'number' },
      skip: { type: 'number' },
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
        },
      },
    },
  },
};

export default schema;
