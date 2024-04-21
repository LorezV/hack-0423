import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Пользователи'],
  params: {
    id: { type: 'number' },
  },
};

export default schema;
