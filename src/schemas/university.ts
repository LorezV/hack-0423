import { citySchema } from './city';

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

export const universityFullSchema = {
  type: 'object',
  properties: {
    ...universitySchema.properties,
    city: citySchema,
  },
};

export const universityAvatarSchema = {
  type: 'object',
  properties: {
    university_id: { type: 'number' },
    path: { type: 'string' },
  },
};

export const universityImageSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    university_id: { type: 'number' },
    path: { type: 'string' },
  },
};
