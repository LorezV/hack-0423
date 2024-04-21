import { IMulterFilter } from '@interfaces';

export function mimetypeFilter(mimetype: string): IMulterFilter {
  return (req, file) => {
    return new Promise((resolve) => {
      if (!new RegExp(mimetype).test(file.mimetype)) {
        throw new Error('Unsupported file mimetype');
      }

      resolve(true);
    });
  };
}
