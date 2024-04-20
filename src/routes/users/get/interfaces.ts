import { IUser } from '@interfaces';

export interface IQuerystring {
  page?: number;
  limit?: number;
  search?: string;
}

export interface IResponse {
  data: {
    users: IUser[];
    total_records: number;
    total_pages: number;
  };
}
