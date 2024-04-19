import { IGenerateTokensData, IToken, Nullable } from '@interfaces';

export interface ITokenService {
  upsertToken(data: IGenerateTokensData, tokenId: Nullable<number>): Promise<IToken>;
  generateTokens(data: IGenerateTokensData): { accessToken: string; refreshToken: string };
}
