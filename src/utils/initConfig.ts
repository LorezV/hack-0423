import { IConfig } from '@interfaces';
import 'dotenv/config';
import { object, string, number } from 'yup';

export function initConfig(): IConfig {
  return object({
    project: string().required(),
    server: object({
      host: string().required(),
      port: number().required(),
    }),
    jwt: object({
      accessSecret: string().required(),
      accessExpires: number().required(),
      refreshSecret: string().required(),
      refreshExpires: number().required(),
    }),
    images: object({
      path: string().required(),
      maxSize: number().required(),
    }),
  }).validateSync({
    project: process.env.npm_package_name || 'hack-0423',
    server: {
      host: process.env.SERVER_HOST,
      port: process.env.SERVER_PORT,
    },
    jwt: {
      accessSecret: process.env.JWT_ACCESS_SECRET,
      accessExpires: process.env.JWT_ACCESS_EXPIRES,
      refreshSecret: process.env.JWT_REFRESH_SECRET,
      refreshExpires: process.env.JWT_ACCESS_EXPIRES,
    },
    images: {
      path: process.env.IMAGES_PATH,
      maxSize: process.env.IMAGES_MAX_SIZE,
    },
  });
}
