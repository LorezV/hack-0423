import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Университеты'],
  body: {},
  response: {
    200: {
      type: 'object',
      properties: {},
    },
  },
};

export default schema;
