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
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      content: { type: 'string' },
      city_id: { type: 'string' },
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
