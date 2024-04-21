import { FastifyInstance } from 'fastify';

import get from './get';

export default async function (instance: FastifyInstance) {
  await instance.register(get, { prefix: '/' });
}
