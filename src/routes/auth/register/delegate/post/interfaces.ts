import { IToken } from '@interfaces';

export interface IBody {
  email: string;
  password: string;
  passwordRepeat: string;
  firstname: string;
  lastname: string;
}

export type TResponse = {
  data: IToken;
};
