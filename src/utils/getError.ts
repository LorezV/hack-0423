import { FastifyError } from 'fastify';
import { STATUS_CODES } from 'http';

export function getError(code: number, message: string): FastifyError {
  return {
    code: String(code),
    name: STATUS_CODES[code] || 'Unknown Error',
    message,
    statusCode: code,
  };
}
