import { UserType } from '@prisma/client';

export interface ITokenPayload {
  userID: number;
  userType: UserType;
}

export interface ITokens {
  accessToken: string;
  accessTokenExpires: Date;
  refreshToken: string;
  refreshTokenExpires: Date;
}
