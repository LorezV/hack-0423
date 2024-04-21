import { IFavourite, ILike, IParticipation, IPost, IUniversity, Nullable } from '@interfaces';
import { IToken } from './token';
import { UserType } from '@prisma/client';

export interface IUser {
  id: number;
  email: string;
  content?: Nullable<string>;
  password: string;
  type: UserType;
  firstname: string;
  lastname: string;
  created_at: Date;
  group_id: Nullable<number>;
}

export type TUserWithoutPassword<T> = Omit<T, 'password'>;

export type TUserWithAvatar = IUser & { avatar: Nullable<IUserAvatar> };

export type TUserWithTokens = IUser & { tokens: IToken[] };

export type TUserWithPosts = IUser & { posts: IPost[] };

export type TUserWithLikes = IUser & { likes: ILike[] };

export type TUserWithFavourites = IUser & { favourites: IFavourite[] };

export type TUserWithVoters = IUser & { voters: IFavourite[] };

export type TUserWithUniversity = IUser & { university: Nullable<IUniversity> };

export type TUserWithParticipations = IUser & { participations: IParticipation };

export interface IUserAvatar {
  user_id: number;
  path: string;
}

export type TUserAvatarWithUser = IUser & { user: IUser };
