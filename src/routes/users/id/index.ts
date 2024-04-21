import { FastifyInstance } from 'fastify';

import get from './get';
import patch from './patch';
import avatar from './avatar';

export default async (instance: FastifyInstance) => {
  await instance.register(get);
  await instance.register(patch);
  await instance.register(avatar, { prefix: '/avatar' });
};
