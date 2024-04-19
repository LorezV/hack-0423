import { IUniversity } from '@interfaces';

export interface ICity {
  id: number;
  name: string;
}

export type TCityWithUniversities = ICity & { universities: IUniversity[] };
