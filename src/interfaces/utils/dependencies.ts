import { IConfig, ITokenService, IUserService } from '@interfaces';
import { PrismaClient } from '@prisma/client';
import { Logger } from 'pino';

export interface IServices {
  userService: IUserService;
  tokenService: ITokenService;
}

export interface IDependencies {
  logger: Logger;
  config: IConfig;
  prisma: PrismaClient;
  services: IServices;
}
