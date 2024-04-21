import { userFullSchema } from '@schemas';
import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Пользоватеди'],
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'number' },
      limit: { type: 'number' },
      search: { type: 'string' },
      type: { type: 'string', enum: ['ADMIN', 'STUDENT', 'DELEGATE'] },
      city_id: { type: 'number' },
      university_id: { type: 'number' },
      faculty_id: { type: 'number' },
      department_id: { type: 'number' },
      flow_id: { type: 'number' },
      group_id: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            users: {
              type: 'array',
              items: userFullSchema,
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
