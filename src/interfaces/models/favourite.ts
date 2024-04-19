import { IUser } from '@interfaces';

export interface IFavourite {
  source_id: number;
  target_id: number;
}

export type TFavouriteWithSource = IFavourite & { source: IUser };

export type TFavouriteWithTarget = IFavourite & { target: IUser };
