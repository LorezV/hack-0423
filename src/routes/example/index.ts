import { FastifyInstance } from 'fastify';

import get from './get';
import post from './post';
import put from './put';
import remove from './remove';

export default (instance: FastifyInstance, options: any, done: () => void) => {
  instance.register(get);
  instance.register(post);
  instance.register(put, { prefix: '/:id' });
  instance.register(remove);

  done();
};
