import fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyCors from '@fastify/cors';
import { getSwaggerOptions, initDependencies, swaggerUiOptions } from './utils';
import initRoutes from './routes';

async function init() {
  const dependencies = initDependencies();

  const { logger, config } = dependencies;

  const app = fastify({
    logger,
    trustProxy: true,
    ignoreTrailingSlash: true,
    disableRequestLogging: true,
  });
  app.decorate('dependencies', dependencies);
  await app.register(fastifySwagger, getSwaggerOptions(config));
  await app.register(fastifySwaggerUi, swaggerUiOptions);
  await app.register(fastifyCors, { origin: false });
  await app.register(initRoutes, { prefix: '/api' });

  app.ready(() => {
    console.log(app.printRoutes());
  });
  await app.listen({ port: config.server.port, host: '0.0.0.0' });
}

init().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
