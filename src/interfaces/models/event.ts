import { IParticipation, IUniversity } from '@interfaces';

export interface IEvent {
  id: number;
  title: string;
  content: string;
  started_at: Date;
  finished_at: Date;
  type_id: number;
  university_id: number;
}

export interface IUpdateEvent {
  title: string;
  content: string;
}

export type TEventWithType = IEvent & { type: IEventType };

export type TEventWithUniversity = IEvent & { university: IUniversity };

export type TEventWithParticipation = IEvent & { participations: IParticipation[] };

export interface IEventType {
  id: number;
  name: string;
  reward: number;
}

export type TEventTypeWithEvents = IEvent & { events: IEvent[] };
