import { groupFullSchema } from './group';

export const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    content: { type: 'string' },
    type: { type: 'string', enum: ['STUDENT', 'ADMIN', 'DELEGATE'] },
    firstname: { type: 'string' },
    lastname: { type: 'string' },
    created_at: { type: 'string', format: 'date-time' },
    group_id: { type: 'number' },
  },
};

export const userFullSchema = {
  type: 'object',
  properties: {
    ...userSchema.properties,
    group: groupFullSchema,
  },
};
