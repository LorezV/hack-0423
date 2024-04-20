import { IDependencies } from '@interfaces';
import { TokenService, UserService, EventService, UniversityService } from '@services';
import { initConfig, initLogger, initPrisma } from '@utils';

export function initDependencies(): IDependencies {
  const config = initConfig();
  const logger = initLogger(config);
  const prisma = initPrisma();

  const userService = new UserService(prisma);
  const tokenService = new TokenService(config, prisma);
  const eventService = new EventService(prisma);
  const universityService = new UniversityService(prisma);

  return {
    logger,
    config,
    prisma,
    services: {
      userService,
      tokenService,
      eventService,
      universityService,
    },
  };
}
