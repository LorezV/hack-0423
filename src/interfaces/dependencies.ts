import { IConfig } from '@interfaces';
import { PrismaClient } from '@prisma/client';
import { EventService, TokenService, UniversityService, UserService } from '@services';
import { Logger } from 'pino';
import { ParticipitionService } from 'src/services/participitionService';

export interface IServices {
  userService: UserService;
  tokenService: TokenService;
  eventService: EventService;
  participationService: ParticipitionService;
  universityService: UniversityService;
}

export interface IDependencies {
  logger: Logger;
  config: IConfig;
  prisma: PrismaClient;
  services: IServices;
}
