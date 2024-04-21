import { FastifyInstance } from 'fastify';

import get from './get';
import patch from './patch';
import remove from './remove';
import upload from './upload';
import avatar from './avatar';

export default async function (instance: FastifyInstance) {
  await instance.register(get, { prefix: '/' });
  await instance.register(patch, { prefix: '/' });
  await instance.register(remove, { prefix: '/' });
  await instance.register(upload, { prefix: '/upload' });
  await instance.register(avatar, { prefix: '/avatar' });
}
