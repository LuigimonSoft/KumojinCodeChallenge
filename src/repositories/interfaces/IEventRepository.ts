import { Event } from '../../models/event';

export interface IEventRepository {
  createEvent(event: Event): Promise<Event>;
  getEvents(): Promise<Event[]>;
  getEventById(id: number): Promise<Event | null>;
  getEventByName(name: string): Promise<Event[] | null>;
  updateEvent(event: Event): Promise<Event>;
  deleteEvent(id: number): Promise<void>;
}