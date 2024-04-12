import { IGroup, IToken, Nullable, TGroupWithPermissions } from '@interfaces';

export interface IUser {
  id: number;
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Nullable<Date>;
  group_id: Nullable<number>;
}

export type TUserWithTokens = IUser & { tokens: IToken[] };

export type TUserWithGroup = IUser & { group: Nullable<IGroup> };

export type TUserWithPermissions = IUser & { group: Nullable<TGroupWithPermissions> };
