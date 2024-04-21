import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Event'],
  body: {
    type: 'object',
    required: ['name', 'started_at', 'finished_at', 'type_id', 'university_id'],
    properties: {
      name: { type: 'string' },
      content: { type: 'string' },
      started_at: { type: 'string' },
      finished_at: { type: 'string' },
      type_id: { type: 'number' },
      university_id: { type: 'number' },
    },
  },
};

export default schema;
