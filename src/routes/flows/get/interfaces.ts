import { IFlow } from '@interfaces';

export interface IQuerystring {
  page?: number;
  limit?: number;
  search?: string;
  department_id?: number;
}

export interface IResponse {
  data: {
    flows: IFlow[];
    total_records: number;
    total_pages: number;
  };
}
