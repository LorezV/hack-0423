import { FastifyInstance, FastifyRequest } from 'fastify';
import { IParams, IQuerystring, IResponse } from './interfaces';
import { extensionFilter, getError, initMulter, mimetypeFilter } from '@utils';
import { setUserGuard, setUserHook } from '@hooks';
import { unlink, writeFile } from 'fs/promises';
import { UserType } from '@prisma/client';
import { IUser } from '@interfaces';
import UUID from 'uuid';
import path from 'path';
import schema from './schema';
import sharp from 'sharp';

export default function (instance: FastifyInstance, options: unknown, done: () => void) {
  const multer = initMulter({
    filters: [
      mimetypeFilter('^audio\\/[A-Za-z0-9-_\\.]+$'),
      extensionFilter(['png', 'jpg', 'jpeg']),
    ],
    limits: {
      fileSize: instance.dependencies.config.images.maxSize * 1024 * 1024,
    },
  });

  setUserHook(instance);
  setUserGuard(instance, [UserType.DELEGATE]);

  instance.addHook('preHandler', multer.single('image'));
  instance.addHook('preHandler', (request, reply, done) => {
    const image = request.file;
    if (!image) {
      throw getError(400, 'IMAGE_REQUIRED');
    }

    done();
  });

  async function post(
    request: FastifyRequest<{ Querystring: IQuerystring; Params: IParams }>,
  ): Promise<IResponse> {
    const { id } = request.params;
    const { type } = request.query;
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

    const buffer = request.file.buffer;
    if (buffer) {
      const filename = `${UUID.v4()}.png`;
      const filepath = path.join(instance.dependencies.config.images.path, filename);

      await writeFile(filepath, await sharp(buffer).png({ compressionLevel: 6 }).toBuffer());

      if (type == 'avatar') {
        let universityAvatar = await prisma.universityAvatar.findUnique({
          where: { university_id: id },
        });
        if (universityAvatar) {
          await unlink(path.join(instance.dependencies.config.images.path, universityAvatar.path));
        }

        universityAvatar = await prisma.universityAvatar.upsert({
          where: { university_id: id },
          update: { path: filename },
          create: { path: filename, university_id: id },
        });

        return {
          data: universityAvatar,
        };
      }

      if (type == 'gallery') {
        const universityImage = await prisma.universityImage.create({
          data: { path: filename, university_id: id },
        });

        return {
          data: universityImage,
        };
      }

      throw getError(400, 'INVALID_IMAGE_TYPE');
    }

    throw getError(500, 'CANNOT_GET_BUFFER_IMAGE');
  }

  instance.post('/', { schema }, post);
  done();
}
