import { FastifyInstance } from 'fastify';

import get from './get';
import getById from './getById';

export default async (instance: FastifyInstance) => {
  await instance.register(get);
  await instance.register(getById, { prefix: '/:id' });
};
