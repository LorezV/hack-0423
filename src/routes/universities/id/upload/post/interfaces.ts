import { IUniversityAvatar, IUniversityImage } from '@interfaces';

export interface IParams {
  id: number;
}

export interface IQuerystring {
  type: 'avatar' | 'gallery';
}

export interface IResponse {
  data: IUniversityAvatar | IUniversityImage;
}
