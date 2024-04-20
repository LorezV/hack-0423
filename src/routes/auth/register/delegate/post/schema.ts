import { tokenSchema } from '@schemas';
import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Auth'],
  body: {
    type: 'object',
    required: ['firstname', 'lastname', 'email', 'password', 'passwordRepeat'],
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
      passwordRepeat: { type: 'string' },
      firstname: { type: 'string' },
      lastname: { type: 'string' },
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
