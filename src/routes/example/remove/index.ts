import { FastifyInstance, FastifyRequest } from 'fastify';
import schema from './schema';
import { IParams, IResponse } from './interface';
import logger from '../../../logger';

export default (instance: FastifyInstance, options: any, done: () => void) => {
  async function get(
    request: FastifyRequest<{ Params: IParams }>,
  ): Promise<IResponse> {
    logger.info(request.params.id);

    return {
      deleted_id: 1,
    };
  }

  instance.get('/', { schema }, get);
  done();
};
