import fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyCors from '@fastify/cors';
import { getSwaggerOptions, initDependencies, swaggerUiOptions } from './utils';
import initRoutes from './routes';
import fastifyStatic from '@fastify/static';

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
  await app.register(fastifyCors, { origin: '*' });
  await app.register(fastifyStatic, {
    root: config.images.path,
    prefix: '/images/',
  });
  await app.register(initRoutes, { prefix: '/api' });

  app.addHook('onRequest', (request, reply, done) => {
    request.log = request.log.child({
      req: {
        url: request.raw.url,
        method: request.method,
        hostname: request.hostname,
        ip: request.ip,
      },
    });
    request.log.info('incoming request');
    done();
  });

  app.addHook('preValidation', (request, reply, done) => {
    request.log.info(
      {
        body: request.body,
        headers: request.headers,
        params: request.params,
        query: request.query,
      },
      'request validation',
    );
    done();
  });

  app.addHook('onResponse', (request, reply, done) => {
    request.log.info(
      {
        response: { statusCode: reply.raw.statusCode },
        responseTime: reply.getResponseTime(),
      },
      'request completed',
    );
    done();
  });

  app.setErrorHandler(async (error, request, reply): Promise<void> => {
    request.log.error(
      {
        url: request.raw.url,
        response: { statusCode: reply.raw.statusCode },
        error: {
          message: error.message,
          code: error.code,
          stack: error.stack,
          name: error.name,
          validation: error.validation,
        },
        responseTime: reply.getResponseTime(),
      },
      'request error',
    );
    await reply.status(error.statusCode || 500).send(error);
  });

  app.ready(() => {
    console.log(app.printRoutes());
  });
  await app.listen({ port: config.server.port, host: '0.0.0.0' });
}

init().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
