import pino from 'pino';

export function initLogger(): pino.Logger {
  return pino({
    name: 'hack-0424',
    level: 'debug',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  });
}
