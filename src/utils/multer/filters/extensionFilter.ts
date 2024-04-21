import { IMulterFilter } from '@interfaces';

export function extensionFilter(allowed?: string[]): IMulterFilter {
  return (req, file) => {
    return new Promise((resolve) => {
      const tokens = file.originalname.split('.');
      if (tokens.length < 2) {
        throw new Error('Unknown file extension');
      }

      const extension = tokens.at(-1);
      if (extension === undefined) {
        throw new Error('Unknown file extension');
      }

      if (allowed && !allowed.includes(extension)) {
        throw new Error('Extension not allowed');
      }

      resolve(true);
    });
  };
}
