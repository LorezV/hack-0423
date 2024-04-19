import { FastifyInstance } from 'fastify';

import post from './post';

export default async (instance: FastifyInstance) => {
  await instance.register(post);
};
