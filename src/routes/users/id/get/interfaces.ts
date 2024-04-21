import { IDepartment, IFaculty, IFlow, IGroup, IUniversity, IUser, Nullable } from '@interfaces';

export interface IParams {
  id: number;
}

export interface IResponse {
  data: IUser & {
    group: Nullable<
      IGroup & {
        flow: IFlow & {
          department: IDepartment & { faculty: IFaculty & { university: IUniversity } };
        };
      }
    >;
  };
}
