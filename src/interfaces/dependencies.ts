import { IConfig } from '@interfaces';
import { PrismaClient } from '@prisma/client';
import { TokenService, UserService } from '@services';
import { Logger } from 'pino';
import { EventService } from 'src/services/event.service';

export interface IServices {
  userService: UserService;
  tokenService: TokenService;
  eventService: EventService;
}

export interface IDependencies {
  logger: Logger;
  config: IConfig;
  prisma: PrismaClient;
  services: IServices;
}
