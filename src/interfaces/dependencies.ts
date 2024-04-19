import { IConfig } from '@interfaces';
import { PrismaClient } from '@prisma/client';
import { TokenService, UserService } from '@services';
import { Logger } from 'pino';

export interface IServices {
  userService: UserService;
  tokenService: TokenService;
}

export interface IDependencies {
  logger: Logger;
  config: IConfig;
  prisma: PrismaClient;
  services: IServices;
}
