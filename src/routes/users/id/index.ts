import { FastifyInstance } from 'fastify';

import get from './get';
import patch from './patch';

export default async (instance: FastifyInstance) => {
  await instance.register(get);
  await instance.register(patch);
};
