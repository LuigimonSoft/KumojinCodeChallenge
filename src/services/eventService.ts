import { parseISO } from 'date-fns';

import { Event } from '../models/event'; 
import { CustomError, typeErrors } from '../utils/customError';
import { ErrorCode } from '../utils/errorCodes';
import { IEventRepository } from '../repositories/interfaces/IEventRepository';
import { IEventService } from './interfaces/IEventService';

export class EventService implements IEventService {
  constructor(private eventRepository: IEventRepository) {}

  public async createEvent(event: Event): Promise<Event> {
    try {
      const startDate = parseISO(event.startDate);
      const endDate = parseISO(event.endDate);

      if (startDate > endDate) {
        throw new CustomError(ErrorCode.STARTDATE_GREATER_THAN_ENDDATE, typeErrors.SERVICE_ERROR, 'createEvent', null);
      }

      event.startDate = startDate.toISOString();
      event.endDate = endDate.toISOString();
      
      return await this.eventRepository.createEvent(event);
    } catch (error) {
      throw error instanceof CustomError ? error : 
        new CustomError(ErrorCode.INTERNAL_SERVER_ERROR, typeErrors.SERVICE_ERROR, 'createEvent', error);
    }
  }

  public async getEvents(): Promise<Event[]> {
    try {
      return await this.eventRepository.getEvents();
    } catch (error) {
      throw error instanceof CustomError ? error : 
        new CustomError(ErrorCode.INTERNAL_SERVER_ERROR, typeErrors.SERVICE_ERROR, 'getEvents', error);
    }
  }

  public async getEventByName(name: string): Promise<Event[] | null> {
    try {
      return await this.eventRepository.getEventByName(name);
    } catch (error) {
      throw error instanceof CustomError ? error : 
        new CustomError(ErrorCode.INTERNAL_SERVER_ERROR, typeErrors.SERVICE_ERROR, 'getEventByName', error);
    }
  }

}