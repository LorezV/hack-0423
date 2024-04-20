import { IFaculty } from '@interfaces';

export interface IQuerystring {
  page?: number;
  limit?: number;
  search?: string;
  university_id?: number;
}

export interface IResponse {
  data: {
    faculties: IFaculty[];
    total_records: number;
    total_pages: number;
  };
}