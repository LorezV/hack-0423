import { universityAvatarSchema, universityImageSchema } from '@schemas';
import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Университеты'],
  consumes: ['multipart/form-data'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
  querystring: {
    type: 'object',
    required: ['type'],
    properties: {
      type: {
        type: 'string',
        enum: ['avatar', 'gallery'],
      },
    },
  },
  response: {
    200: {
      oneOf: [
        {
          type: 'object',
          properties: {
            data: universityAvatarSchema,
          },
        },
        {
          type: 'object',
          properties: {
            data: universityImageSchema,
          },
        },
      ],
      examples: [
        {
          university_id: 1,
          path: '/images/uiasdasd.png',
        },
        {
          id: 1,
          university_id: 1,
          path: '/images/uiasdasd.png',
        },
      ],
    },
  },
  security: [
    {
      auth: [],
    },
  ],
};

export default schema;
