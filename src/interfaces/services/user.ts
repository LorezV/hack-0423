import { Nullable } from '@interfaces';
import { UserType } from '@prisma/client';

export interface ICreateUserInput {
  email: string;
  password: string;
  type: UserType;
  firstname: string;
  lastname: string;
  group_id?: Nullable<number>;
}
