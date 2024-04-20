import { tokenSchema } from '@schemas';
import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Авторизация'],
  body: {
    type: 'object',
    required: ['refresh_token'],
    properties: {
      refreshToken: { type: 'string' },
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
