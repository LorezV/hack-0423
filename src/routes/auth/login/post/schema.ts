import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Auth'],
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
  },
};

export default schema;
