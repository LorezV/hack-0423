import jwt from 'jsonwebtoken';
import { PrismaClient, Token } from '@prisma/client';
import { IConfig, IToken, ITokenPayload, ITokens, Nullable } from '@interfaces';
import dayjs from 'dayjs';

export class TokenService {
  constructor(
    private readonly config: IConfig,
    private readonly prisma: PrismaClient,
  ) {}

  async createToken(payload: ITokenPayload, tokenId: Nullable<number>): Promise<Token> {
    const tokens = this.generateTokens(payload);

    const data = {
      access_token: tokens.accessToken,
      access_token_expired_at: tokens.accessTokenExpires,
      refresh_token: tokens.refreshToken,
      refresh_token_expired_at: tokens.refreshTokenExpires,
    };

    return await this.prisma.token.upsert({
      where: { id: tokenId === null ? -9999 : tokenId },
      create: {
        user_id: payload.userID,
        ...data,
      },
      update: { ...data },
    });
  }

  async resolveToken(token: string): Promise<Nullable<IToken>> {
    return this.prisma.token.findFirst({
      where: { OR: [{ access_token: token }, { refresh_token: token }] },
    });
  }

  getAccessTokenPayload(accessToken: string): Nullable<ITokenPayload> {
    try {
      return jwt.verify(accessToken, this.config.jwt.accessSecret) as ITokenPayload;
    } catch (e: unknown) {
      return null;
    }
  }

  getRefreshTokenPayload(refreshToken: string): Nullable<ITokenPayload> {
    try {
      return jwt.verify(refreshToken, this.config.jwt.refreshSecret) as ITokenPayload;
    } catch (e: unknown) {
      return null;
    }
  }

  generateTokens(payload: ITokenPayload): ITokens {
    return {
      accessToken: jwt.sign(payload, this.config.jwt.accessSecret, {
        expiresIn: this.config.jwt.accessExpires,
      }),
      accessTokenExpires: dayjs().add(this.config.jwt.accessExpires, 'ms').toDate(),
      refreshToken: jwt.sign(payload, this.config.jwt.refreshSecret, {
        expiresIn: this.config.jwt.refreshExpires,
      }),
      refreshTokenExpires: dayjs().add(this.config.jwt.accessExpires, 'ms').toDate(),
    };
  }
}
