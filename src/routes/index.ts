import { FastifyInstance } from 'fastify';

import auth from './auth';
import universities from './universities';
import faculties from './faculties';
import departments from './departments';
import flows from './flows';
import groups from './groups';

export default async (instance: FastifyInstance) => {
  await instance.register(auth, { prefix: '/auth' });
  await instance.register(universities, { prefix: '/universities' });
  await instance.register(faculties, { prefix: '/faculties' });
  await instance.register(departments, { prefix: '/departments' });
  await instance.register(flows, { prefix: '/flows' });
  await instance.register(groups, { prefix: '/groups' });
};
