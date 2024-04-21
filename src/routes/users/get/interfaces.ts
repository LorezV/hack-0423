import { IDepartment, IFaculty, IFlow, IGroup, IUniversity, IUser } from '@interfaces';
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
    users: IUser &
      {
        group: IGroup & {
          flow: IFlow & {
            department: IDepartment & { faculty: IFaculty & { university: IUniversity } };
          };
        };
      }[];
    total_records: number;
    total_pages: number;
  };
}
