import { IUser } from './user';

export interface IToken {
  id: number;
  access_token: string;
  access_token_expired_at: Date;
  refresh_token: string;
  refresh_token_expired_at: Date;
  user_id: number;
}

export type TTokenWithUser = IToken & { user: IUser };
