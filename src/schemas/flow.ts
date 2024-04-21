import { departmentFullSchema } from './department';

export const flowSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    department_id: { type: 'number' },
  },
};

export const flowFullSchema = {
  type: 'object',
  properties: {
    ...flowSchema.properties,
    department: departmentFullSchema,
  },
};
