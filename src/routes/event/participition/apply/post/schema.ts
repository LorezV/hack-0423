import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Event'],
  summary: 'Participition apply(by university imperator)',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
};

export default schema;
