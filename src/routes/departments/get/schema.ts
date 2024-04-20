import { FastifySchema } from 'fastify';
import { departmentSchema } from '@schemas';

const schema: FastifySchema = {
  tags: ['Кафедры'],
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'number' },
      limit: { type: 'number' },
      search: { type: 'string' },
      faculty_id: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            departments: {
              type: 'array',
              items: departmentSchema,
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
