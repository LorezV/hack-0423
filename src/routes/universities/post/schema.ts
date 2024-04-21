import { universitySchema } from '@schemas';
import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Университеты'],
  body: {
    type: 'object',
    required: ['name', 'content', 'city_id'],
    properties: {
      name: { type: 'string' },
      content: { type: 'string' },
      city_id: { type: 'number' },
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
