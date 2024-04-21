import { facultyFullSchema } from './faculty';

export const departmentSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    faculty_id: { type: 'number' },
  },
};

export const departmentFullSchema = {
  type: 'object',
  properties: {
    ...departmentSchema.properties,
    faculty: facultyFullSchema,
  },
};
