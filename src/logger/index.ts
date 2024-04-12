import pino from 'pino'

export default pino({
  name: 'hack-0424',
  level: 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
})
