import { FastifySchema } from 'fastify';
import { facultySchema } from '@schemas';

const schema: FastifySchema = {
  tags: ['Факультеты'],
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'number' },
      limit: { type: 'number' },
      search: { type: 'string' },
      university_id: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            universities: {
              type: 'array',
              items: facultySchema,
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
