import { FastifyInstance } from 'fastify';

import example from './example';

export default async (
  instance: FastifyInstance,
  options: any,
  done: () => void,
) => {
  await instance.register(example, { prefix: '/example' });

  done();
};
