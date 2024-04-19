import { IFaculty, IFlow } from '@interfaces';

export interface IDepartment {
  id: number;
  name: string;
  faculty_id: number;
}

export type TDepartmentWithFaculty = IDepartment & { faculty: IFaculty };

export type TDepartmentWithFlows = IDepartment & { flows: IFlow[] };
