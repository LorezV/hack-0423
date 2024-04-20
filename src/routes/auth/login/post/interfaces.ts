import { IToken } from '@interfaces';

export interface IBody {
  email: string;
  password: string;
}

export type TResponse = {
  data: IToken;
};
