import { IDepartment, IUniversity } from '@interfaces';

export interface IFaculty {
  id: number;
  name: string;
  university_id: number;
}

export type TFacultyWithUniversity = IFaculty & { university: IUniversity };

export type TFacultyWithDepartments = IFaculty & { university: IDepartment[] };
