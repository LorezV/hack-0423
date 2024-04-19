import { IPost, IUser } from '@interfaces';

export interface ILike {
  user_id: number;
  post_id: number;
}

export type TLikeWithUser = ILike & { user: IUser };

export type TLikeWithPost = ILike & { user: IPost };
