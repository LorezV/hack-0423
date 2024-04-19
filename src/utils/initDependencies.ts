import { IDependencies } from '@interfaces';
import { TokenService, UserService } from '@services';
import { initConfig, initLogger, initPrisma } from '@utils';

export async function initDependencies(): Promise<IDependencies> {
  const logger = initLogger();
  const config = initConfig();
  const prisma = initPrisma();

  const userService = new UserService(prisma);
  const tokenService = new TokenService(config, prisma);

  return {
    logger,
    config,
    prisma,
    services: {
      userService,
      tokenService,
    },
  };
}
