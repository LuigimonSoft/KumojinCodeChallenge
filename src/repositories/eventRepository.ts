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

}