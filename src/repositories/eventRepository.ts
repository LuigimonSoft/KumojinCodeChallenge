import { Event } from '../models/event'; 
import { CustomError, typeErrors } from '../utils/customError';
import { ErrorCode } from '../utils/errorCodes';

export class EventRepository
{
  private events: Event[] = [];

  public async createEvent(event: Event): Promise<Event>
  {
    try 
    {
      // Simulate a database insert by pushing the event to the events array
      event.id = this.events.length + 1;
      this.events.push(event);
      return event;
    } catch (error){
      throw new CustomError(ErrorCode.DATABASE_ERROR, typeErrors.REPOSITORY_ERROR, 'addEvent', error);
    }
  }

  public async getEvents(): Promise<Event[]>
  {
    try {
      // Simulate a database select by returning the events array
      return this.events;
    } catch (error){
      throw new CustomError(ErrorCode.DATABASE_ERROR, typeErrors.REPOSITORY_ERROR, 'getEvents', error);
    }
  }

  public async getEventById(id: number): Promise<Event | null>
  {
    try {
      // Simulate a database select by finding the event in the events array
      const event = this.events.find(event => event.id === id);
      return event || null;
    } catch (error){
      throw new CustomError(ErrorCode.DATABASE_ERROR, typeErrors.REPOSITORY_ERROR, 'getEventById', error);
    }
  }

  public async getEventByName(name: string): Promise<Event[] | null>
  {
    try {
      // Simulate a database select by finding the event in the events array
      const event = this.events.filter(event => event.name.startsWith(name));
      return event || null;
    } catch (error){
      throw new CustomError(ErrorCode.DATABASE_ERROR, typeErrors.REPOSITORY_ERROR, 'getEventByName', error);
    }
  }

  public async updateEvent(event: Event): Promise<Event>
  {
    try {
      // Simulate a database update by finding the event in the events array and updating it
      const index = this.events.findIndex(e => e.id === event.id);
      this.events[index] = event;
      return event;
    } catch (error){
      throw new CustomError(ErrorCode.DATABASE_ERROR, typeErrors.REPOSITORY_ERROR, 'updateEvent', error);
    }
  }

  public async deleteEvent(id: number): Promise<void>
  {
    try {
      // Simulate a database delete by filtering out the event from the events array
      this.events = this.events.filter(event => event.id !== id);
    } catch (error){
      throw new CustomError(ErrorCode.DATABASE_ERROR, typeErrors.REPOSITORY_ERROR, 'deleteEvent', error);
    }
  }
}