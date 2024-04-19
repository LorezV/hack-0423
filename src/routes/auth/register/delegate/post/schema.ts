import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Auth'],
  body: {
    type: 'object',
    required: ['firstname', 'lastname', 'email', 'password', 'passwordRepeat'],
    properties: {
      firstname: { type: 'string' },
      lastname: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      passwordRepeat: { type: 'string' },
    },
  },
};

export default schema;
