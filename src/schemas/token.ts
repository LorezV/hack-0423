export const tokenSchema = {
  type: 'object',
  requried: [
    'id',
    'access_token',
    'access_token_expired_at',
    'refresh_token',
    'refresh_token_expired_at',
  ],
  properties: {
    id: { type: 'number' },
    access_token: { type: 'string' },
    access_token_expired_at: { type: 'string', format: 'date-time' },
    refresh_token: { type: 'string' },
    refresh_token_expired_at: { type: 'string', format: 'date-time' },
  },
};
