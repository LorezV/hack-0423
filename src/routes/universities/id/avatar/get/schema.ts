import { universityAvatarSchema } from '@schemas';
import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Пользователи'],
  params: {
    id: { type: 'number' },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: universityAvatarSchema,
      },
    },
  },
};

export default schema;
