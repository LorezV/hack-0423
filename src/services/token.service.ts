import jwt from 'jsonwebtoken';
import { PrismaClient, Token } from '@prisma/client';
import { IConfig } from '@interfaces';

export class TokenService {
  constructor(private readonly config: IConfig, private readonly prisma: PrismaClient) {}

  async upsertToken(data: IGenerateTokensData, tokenId: Nullable<number>): Promise<Token> {
    const { accessToken, refreshToken } = this.generateTokens(data);

    return await this.prisma.token.upsert({
      where: { id: tokenId === null ? -9999 : tokenId },
      create: { user_id: data.user_id, access_token: accessToken, refresh_token: refreshToken },
      update: { access_token: accessToken, refresh_token: refreshToken },
    });
  }

  generateTokens(data: IGenerateTokensData): { accessToken: string; refreshToken: string } {
    return {
      accessToken: jwt.sign(data, this.config.jwt.accessSecret, {
        expiresIn: this.config.jwt.accessExpiresIn,
      }),
      refreshToken: jwt.sign(data, this.config.jwt.refreshSecret, {
        expiresIn: this.config.jwt.refreshExpiresIn,
      }),
    };
  }
}
