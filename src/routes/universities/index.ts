import { FastifyInstance } from 'fastify';

import get from './get';
import post from './post';
import id from './id';

export default async (instance: FastifyInstance) => {
  await instance.register(get, { prefix: '/' });
  await instance.register(post, { prefix: '/' });
  await instance.register(id, { prefix: '/:id' });
};
