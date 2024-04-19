import { FastifySchema } from 'fastify';

const schema: FastifySchema = {
  tags: ['Auth'],
  body: {
    type: 'object',
    required: ['firstname', 'lastname', 'email', 'password', 'passwordRepeat'],
    properties: {
      firstname: { type: 'string' },
      lastname: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      passwordRepeat: { type: 'string' },
      university_id: { type: 'number' },
      faculty_id: { type: 'number' },
      department_id: { type: 'number' },
      flow_id: { type: 'number' },
      group_id: { type: 'number' },
    },
  },
};

export default schema;
