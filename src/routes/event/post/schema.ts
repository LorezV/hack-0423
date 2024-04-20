import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Event'],
  body: {
    type: 'object',
    required: ['title', 'started_at', 'finished_at', 'type_id', 'university_id'],
    properties: {
      title: { type: 'string' },
      content: { type: 'string' },
      started_at: { type: 'string', format: 'date-time' },
      finished_at: { type: 'string', format: 'date-time' },
      type_id: { type: 'number' },
      university_id: { type: 'number' },
    },
  },
};

export default schema;
