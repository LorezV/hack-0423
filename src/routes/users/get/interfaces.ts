import { IUser } from '@interfaces';
import { UserType } from '@prisma/client';

export interface IQuerystring {
  page?: number;
  limit?: number;
  search?: string;
  type: UserType;
  city_id?: number;
  university_id?: number;
  faculty_id?: number;
  department_id?: number;
  flow_id?: number;
  group_id?: number;
}

export interface IResponse {
  data: {
    users: IUser[];
    total_records: number;
    total_pages: number;
  };
}
