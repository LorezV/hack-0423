import { IEvent } from '@interfaces';

export interface IBody extends Omit<IEvent, 'id'> {}
