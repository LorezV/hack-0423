import { IConfig } from '@interfaces';
import { PrismaClient } from '@prisma/client';
import { EventService, TokenService, UniversityService, UserService } from '@services';
import { Logger } from 'pino';

export interface IServices {
  userService: UserService;
  tokenService: TokenService;
  eventService: EventService;
  universityService: UniversityService;
}

export interface IDependencies {
  logger: Logger;
  config: IConfig;
  prisma: PrismaClient;
  services: IServices;
}
