import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'number',
      },
    },
  },
  response: {
    200: {
      type: 'object',
      required: ['deleted_id'],
      properties: {
        deleted_id: {
          type: 'number',
        },
      },
    },
  },
};

export default schema;
