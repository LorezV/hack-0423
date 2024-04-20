import { IFlow, IUser } from '@interfaces';

export interface IGroup {
  id: number;
  name: string;
  flow_id: number;
}

export type TGroupWithFlow = IGroup & { flow: IFlow };

export type TGroupWithUsers = IGroup & { users: IUser[] };
