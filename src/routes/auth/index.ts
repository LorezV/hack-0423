import { FastifyInstance } from 'fastify';

import login from './login/post';
import register from './register/post';

export default async (instance: FastifyInstance) => {
  await instance.register(login, { prefix: '/login' });
  await instance.register(register, { prefix: '/register' });
};
