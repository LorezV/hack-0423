import { IUser, Nullable, TUserWithPermissions, TUserWithTokens } from '@interfaces';

export interface IUserService {
  createUser(email: string, password: string): Promise<IUser>;

  findById(id: number): Promise<Nullable<TUserWithPermissions & TUserWithTokens>>;
  findByEmail(email: string): Promise<Nullable<TUserWithPermissions & TUserWithTokens>>;
}
