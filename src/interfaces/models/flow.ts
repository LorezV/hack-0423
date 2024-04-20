import { IDepartment, IGroup } from '@interfaces';

export interface IFlow {
  id: number;
  name: string;
  department_id: number;
}

export type TFlowWithDepartment = { department: IDepartment };

export type IFlowWithGroups = { groups: IGroup[] };
