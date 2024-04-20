export const facultySchema = {
  type: 'object',
  required: ['id', 'name', 'content', 'delegate_id', 'city_id'],
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    university_id: { type: 'number' },
  },
};
