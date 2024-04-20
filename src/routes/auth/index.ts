import { FastifyInstance } from 'fastify';

import login from './login';
import refresh from './refresh';
import register from './register';

export default async (instance: FastifyInstance) => {
  await instance.register(login, { prefix: '/login' });
  await instance.register(register, { prefix: '/register' });
  await instance.register(refresh, { prefix: '/refresh' });
};
