import { convertSchema } from '@sodaru/yup-to-json-schema';
import { FastifySchema } from 'fastify';
import { object, string } from 'yup';

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
