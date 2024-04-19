import { Nullable } from '@interfaces';
import { IUser } from './user';

export interface IToken {
  id: number;
  access_token: string;
  refresh_token: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Nullable<Date>;
}

export type TTokenWithUser = IToken & { user: IUser };

export interface IGenerateTokensData {
  user_id: number;
  user_group: Nullable<string>;
  user_permissions: Nullable<Array<string>>;
}
