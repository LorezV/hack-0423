import { SwaggerOptions } from '@fastify/swagger';

export const swaggerOptions: SwaggerOptions = {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'HACK-0424',
      description: 'API for HACK-0424',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Localhost server',
      },
    ],
    tags: [{ name: 'Auth' }],
    components: {
      securitySchemes: {
        auth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
  },
};

export const swaggerUiOptions = {
  routePrefix: '/swagger',
  uiConfig: {
    validatorUrl: null,
  },
};
