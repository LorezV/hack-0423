import { FastifyInstance, FastifyRequest } from 'fastify';
import { IParams, IQuerystring, IResponse } from './interfaces';
import schema from './schema';
import { setUserGuard, setUserHook } from '@hooks';
import { getError } from '@utils';
import { IUser } from '@interfaces';

export default function (instance: FastifyInstance, options: unknown, done: () => void) {
  setUserHook(instance);
  setUserGuard(instance);

  async function post(
    request: FastifyRequest<{ Querystring: IQuerystring; Params: IParams }>,
  ): Promise<IResponse> {
    const { id } = request.params;
    const { type, image_id } = request.query;
    const { prisma } = instance.dependencies;
    const delegate = request.user as IUser;

    const university = await prisma.university.findUnique({
      where: { id },
    });
    if (!university) {
      throw getError(404, 'UNIVERSITY_NOT_FOUND');
    }

    if (university.delegate_id !== delegate.id) {
      throw getError(403, 'FORBIDDEN');
    }

    if (type == 'avatar') {
      let avatar = await prisma.universityAvatar.findUnique({ where: { university_id: id } });
      if (!avatar) {
        throw getError(404, 'AVATAR_NOT_FOUND');
      }

      avatar = await prisma.universityAvatar.delete({ where: { university_id: id } });

      return {
        data: avatar,
      };
    }

    if (type == 'gallery') {
      if (!image_id) {
        throw getError(400, 'IMAGE_ID_REQUIRED');
      }

      let image = await prisma.universityImage.findUnique({
        where: { university_id: id, id: image_id },
      });
      if (!image) {
        throw getError(404, 'IMAGE_NOT_FOUND');
      }

      image = await prisma.universityImage.delete({
        where: { id: image_id, university_id: id },
      });

      return {
        data: image,
      };
    }

    throw getError(400, 'INVALID_IMAGE_TYPE');
  }

  instance.delete('/', { schema }, post);
  done();
}
