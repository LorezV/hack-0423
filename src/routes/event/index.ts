import { FastifyInstance } from 'fastify';

import get from './get';
import post from './post';
import put from './put';
import remove from './remove';

export default async (instance: FastifyInstance) => {
  await instance.register(post, { prefix: '/' });
  await instance.register(get, { prefix: '/:id' });
  await instance.register(put, { prefix: '/:id' });
  await instance.register(remove, { prefix: '/:id' });
};
