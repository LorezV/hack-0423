import { flowFullSchema } from './flow';

export const groupSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    flow_id: { type: 'number' },
  },
};

export const groupFullSchema = {
  type: 'object',
  properties: {
    ...groupSchema.properties,
    flow: flowFullSchema,
  },
};
