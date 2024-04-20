import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Event'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
};

export default schema;
