import { tokenSchema } from '@schemas';
import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Авторизация'],
  body: {
    type: 'object',
    required: ['firstname', 'lastname', 'email', 'password', 'passwordRepeat', 'group_id'],
    properties: {
      firstname: { type: 'string' },
      lastname: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      passwordRepeat: { type: 'string' },
      group_id: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: tokenSchema,
      },
    },
  },
};

export default schema;
