import { ILike, IUser } from '@interfaces';

export interface IPost {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  author_id: number;
  post_category_id: number;
}

export type TPostWithAuthor = IPost & { author: IUser };

export type TPostWithCategory = IPost & { post_category: IPostCategory };

export type TPostWithImages = IPost & { files: IPostImage[] };

export type TPostWithLikes = IPost & { likes: ILike[] };

export interface IPostCategory {
  id: number;
  name: string;
}

export interface IPostImage {
  id: number;
  path: string;
  post_id: number;
}

export type TPostImageWithPost = IPostImage & { post: IPost };
