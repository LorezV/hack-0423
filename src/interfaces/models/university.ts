import { ICity, IEvent, IFaculty, IUser, Nullable } from '@interfaces';

export interface IUniversity {
  id: number;
  name: string;
  content: string;
  delegate_id: number;
  city_id: number;
}

export type IUniversityWithDelegate = IUniversity & { delegate: IUser };

export type IUniversityWithCity = IUniversity & { city: ICity };

export type TUniversityWithAvatar = IUniversity & { avatar: Nullable<IUniversityAvatar> };

export type TUniversityWithImages = IUniversity & { images: IUniversityImage[] };

export type TUniversityWithFaculty = IUniversity & { faculties: IFaculty[] };

export type TUniversityWithEvents = IUniversity & { faculty: IEvent[] };

export interface IUniversityAvatar {
  university_id: number;
  path: string;
}

export type TUniversityAvatarWithUniversity = IUniversityAvatar & { university: IUniversity };

export interface IUniversityImage {
  id: number;
  path: string;
  university_id: number;
}

export type TUniversityImageWithUniversity = IUniversityImage & { university: IUniversity };
