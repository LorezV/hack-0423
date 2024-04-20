import { Nullable } from '@interfaces';
import { STATUS_CODES } from 'http';

export function getError(code: number, message: string, data?: Nullable<unknown>) {
  return {
    code,
    error: STATUS_CODES[code] || 'Unknown Error',
    message,
    data,
  };
}
