export const universitySchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    content: { type: 'string' },
    delegate_id: { type: 'number' },
    city_id: { type: 'number' },
  },
};
