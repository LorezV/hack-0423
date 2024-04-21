import { universitySchema } from './university';

export const facultySchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    university_id: { type: 'number' },
  },
};

export const facultyFullSchema = {
  type: 'object',
  properties: {
    ...facultySchema.properties,
    university: universitySchema,
  },
};
