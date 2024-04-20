import { FastifyInstance } from 'fastify';

import apply from './apply';
import post from './post';

export default async (instance: FastifyInstance) => {
  await instance.register(post, { prefix: '/:id' });
  await instance.register(apply, { prefix: '/apply' });
};
