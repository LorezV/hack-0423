import { universitySchema } from '@schemas';
import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Университеты'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: universitySchema,
      },
    },
  },
  security: [
    {
      auth: [],
    },
  ],
};

export default schema;
