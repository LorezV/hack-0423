import { ICity } from '@interfaces';

export interface IQuerystring {
  search?: string;
}

export interface IResponse {
  data: {
    cities: ICity[];
  };
}
