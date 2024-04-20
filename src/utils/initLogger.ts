import { IConfig } from '@interfaces';
import pino from 'pino';

export function initLogger(config: IConfig): pino.Logger {
  return pino({
    name: config.project,
    level: 'debug',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  });
}
