import { IUser, Nullable } from '@interfaces';

export interface IGroup {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Nullable<Date>;
}

export type TGroupWithUsers = IGroup & { users: IUser[] };

export type TGroupWithPermissions = IGroup & { permissions: IPermission[] };

export interface IPermission {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Nullable<Date>;
}

export type TPermissionWithGroups = IPermission & { groups: IGroup[] };
