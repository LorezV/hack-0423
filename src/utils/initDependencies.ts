import { IDependencies } from '@interfaces';
import { TokenService, UserService } from '@services';
import { initConfig, initLogger, initPrisma } from '@utils';
import { EventService } from 'src/services/event.service';

export async function initDependencies(): Promise<IDependencies> {
  const config = initConfig();
  const logger = initLogger(config);
  const prisma = initPrisma();

  const userService = new UserService(prisma);
  const tokenService = new TokenService(config, prisma);
  const eventService = new EventService(prisma);

  return {
    logger,
    config,
    prisma,
    services: {
      userService,
      tokenService,
      eventService,
    },
  };
}
