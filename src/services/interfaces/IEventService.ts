import { Event } from '../../models/event';

export interface IEventService {
  createEvent(event: Event): Promise<Event>;
  getEvents(): Promise<Event[]>;
  getEventByName(name: string): Promise<Event[] | null>;
}