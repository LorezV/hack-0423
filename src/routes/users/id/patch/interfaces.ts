import { IUser } from '@interfaces';

export interface IParams {
  id: number;
}

export interface IBody {
  email?: string;
  content?: string;
  fistname?: string;
  lastname?: string;
  group_id: number;
}

export interface IResponse {
  data: IUser;
}
