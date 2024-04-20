import { IUniversity } from '@interfaces';

export interface IQuerystring {
  page?: number;
  limit?: number;
  search?: string;
}

export interface IResponse {
  data: {
    universities: IUniversity[];
    total_records: number;
    total_pages: number;
  };
}
