export const universitySchema = {
  type: 'object',
  required: ['id', 'name', 'content', 'delegate_id', 'city_id'],
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    content: { type: 'string' },
    delegate_id: { type: 'number' },
    city_id: { type: 'number' },
  },
};
