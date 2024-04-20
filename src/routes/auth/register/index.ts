import { FastifyInstance } from 'fastify';

import delegate from './delegate';
import student from './student';

export default async (instance: FastifyInstance) => {
  await instance.register(delegate, { prefix: '/delegate' });
  await instance.register(student, { prefix: '/student' });
};
