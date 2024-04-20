import { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import { IConfig } from '@interfaces';

export function getSwaggerOptions(config: IConfig): FastifyDynamicSwaggerOptions {
  return {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: config.project,
        description: `API for ${config.project}`,
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Localhost server',
        },
        {
          url: 'https://closing-elk-willingly.ngrok-free.app/',
          description: 'Dev server',
        },
      ],
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
}

export const swaggerUiOptions = {
  routePrefix: '/swagger',
  uiConfig: {
    validatorUrl: null,
  },
};
