import { IDepartment } from '@interfaces';

export interface IQuerystring {
  page?: number;
  limit?: number;
  search?: string;
  faculty_id?: number;
}

export interface IResponse {
  data: {
    departments: IDepartment[];
    total_records: number;
    total_pages: number;
  };
}
