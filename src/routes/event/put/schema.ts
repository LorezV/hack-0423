import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Event'],
  body: {
    type: 'object',
    required: ['title'],
    properties: {
      title: { type: 'string' },
      content: { type: 'string' },
    },
  },
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
};

export default schema;
