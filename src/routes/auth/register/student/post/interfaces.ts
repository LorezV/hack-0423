import { IToken } from '@interfaces';

export interface IBody {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  passwordRepeat: string;
  group_id: number;
}

export type TResponse = {
  data: IToken;
};
