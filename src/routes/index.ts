import { FastifyInstance } from 'fastify';

import auth from './auth';
import event from './event';

export default async (instance: FastifyInstance) => {
  await instance.register(auth, { prefix: '/auth' });
  await instance.register(event, { prefix: '/events' });
};
