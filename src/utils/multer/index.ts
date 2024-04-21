export * from './filters';
import { IMulterOptions } from '@interfaces';
import multer, { diskStorage, memoryStorage } from 'fastify-multer';
import type { Options } from 'fastify-multer/lib/interfaces';

export function initMulter({ destination, filename, filters, limits }: IMulterOptions) {
  const options: Options = { limits };

  if (destination)
    options.storage = diskStorage({
      destination,
      filename: typeof filename === 'string' ? (req, file, cb) => cb(null, filename) : filename,
    });
  else options.storage = memoryStorage();

  if (filters)
    options.fileFilter = (req, file, cb) => {
      Promise.all(filters.map((f) => f(req, file)))
        .then((result) =>
          cb(
            null,
            result.every((value) => value === true),
          ),
        )
        .catch((err: Error) => {
          cb(err);
        });
    };

  return multer(options);
}
