import { IDependencies } from '@interfaces';
import { TokenService, UserService, EventService } from '@services';
import { initConfig, initLogger, initPrisma } from '@utils';
import { ParticipitionService } from 'src/services/participitionService';

export function initDependencies(): IDependencies {
  const config = initConfig();
  const logger = initLogger(config);
  const prisma = initPrisma();

  const userService = new UserService(prisma);
  const tokenService = new TokenService(config, prisma);
  const eventService = new EventService(prisma);
  const participationService = new ParticipitionService(prisma, eventService);

  return {
    logger,
    config,
    prisma,
    services: {
      userService,
      tokenService,
      eventService,
      participationService,
    },
  };
}
