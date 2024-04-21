import { groupFullSchema } from './group';
<<<<<<< HEAD
import { universityFullSchema } from './university';
=======
import { universitySchema } from './university';
>>>>>>> 37339c2eb8319275e539fc8784a6d9f55a456f60

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
<<<<<<< HEAD
    university: universityFullSchema,
=======
    university: universitySchema,
>>>>>>> 37339c2eb8319275e539fc8784a6d9f55a456f60
  },
};

export const userAvatarSchema = {
  type: 'object',
  properties: {
    user_id: { type: 'number' },
    path: { type: 'string' },
  },
};
