import { IConfig } from '@interfaces';
import 'dotenv/config';
import { object, string, number } from 'yup';

export function initConfig(): IConfig {
  return object({
    server: object({
      host: string().required(),
      port: number().required(),
    }),
    jwt: object({
      accessSecret: string().required(),
      accessExpiresIn: number().required(),
      refreshSecret: string().required(),
      refreshExpiresIn: number().required(),
    }),
  }).validateSync({
    server: {
      host: process.env.SERVER_HOST,
      port: process.env.SERVER_PORT,
    },
    jwt: {
      accessSecret: process.env.ACCESS_SECRET,
      accessExpiresIn: process.env.ACCESS_EXPIRES_IN,
      refreshSecret: process.env.REFRESH_SECRET,
      refreshExpiresIn: process.env.REFRESH_EXPIRES_IN,
    },
  });
}
