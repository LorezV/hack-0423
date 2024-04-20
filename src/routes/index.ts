import { FastifyInstance } from 'fastify';

import auth from './auth';
import universities from './universities';
import faculties from './faculties';

export default async (instance: FastifyInstance) => {
  await instance.register(auth, { prefix: '/auth' });
  await instance.register(universities, { prefix: '/universities' });
  await instance.register(faculties, { prefix: '/faculties' });
};
