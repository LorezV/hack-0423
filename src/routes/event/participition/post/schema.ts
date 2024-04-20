import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Event'],
  summary: 'Participition send(by user)',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
};

export default schema;
