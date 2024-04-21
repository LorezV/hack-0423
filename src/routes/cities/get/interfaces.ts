import { ICity } from '@interfaces';

export interface IQuerystring {
  search?: string;
  limit?: number;
  page?: number;
}

export interface IResponse {
  data: {
    cities: ICity[];
    total_records: number;
    total_pages: number;
  };
}
