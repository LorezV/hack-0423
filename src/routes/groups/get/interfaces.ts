import { IGroup } from '@interfaces';

export interface IQuerystring {
  page?: number;
  limit?: number;
  search?: string;
  flow_id?: number;
}

export interface IResponse {
  data: {
    groups: IGroup[];
    total_records: number;
    total_pages: number;
  };
}
