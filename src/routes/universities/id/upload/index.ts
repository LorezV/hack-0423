import { FastifyInstance } from 'fastify';

import post from './post';
import remove from './remove';

export default async function (instance: FastifyInstance) {
  await instance.register(post, { prefix: '/' });
  await instance.register(remove, { prefix: '/' });
}
