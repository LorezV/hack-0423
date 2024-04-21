import { userSchema } from '@schemas';
import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Пользоватеди'],
  params: {
    id: { type: 'number' },
  },
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      content: { type: 'string' },
      fistname: { type: 'string' },
      lastname: { type: 'string' },
      group_id: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: userSchema,
      },
    },
  },
};

export default schema;
