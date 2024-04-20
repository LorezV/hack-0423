import { IEvent, IUser } from '@interfaces';

export interface IParticipation {
  id: number;
  approved: boolean;
  reward: number;
  user_id: number;
  event_id: number;
}

export type TParticipationWithUser = IParticipation & { user: IUser };

export type TParticipationWithEvent = IParticipation & { event: IEvent };
