import {  Request, Response, NextFunction } from 'express';

import { IEventService } from '../services/interfaces/IEventService';
import { Event } from '../models/event';
import { CustomError, typeErrors } from '../utils/customError';
import { ErrorCode } from '../utils/errorCodes';
import { createEventValidator, getEventByNameValidator } from '../validators/eventValidator';


export class EventController {
  constructor(private eventService: IEventService) {}

  public createEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const event: Event = req.body;
      const newEvent = await this.eventService.createEvent(event);
      res.status(201).json(newEvent);
    } catch (error) {
      this.raiseError(error, 'createEvent', next);
    }
  }

  public getEventByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const name = req.params.name;
      const event = await this.eventService.getEventByName(name);
      if (event)
        res.status(200).json(event);
      else {
        throw new CustomError(ErrorCode.EVENT_NOT_FOUND, typeErrors.CONTROLLER_ERROR, 'getEventByName', null);
      }
    } catch (error) {
      this.raiseError(error, 'getEventByName', next);
    }
  }

  public getEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {
      const events = await this.eventService.getEvents();
      res.status(200).json(events);
    } catch (error) {
      this.raiseError(error, 'getEvents', next);
    }
  }

  public createEventWithValidation() {
    return [createEventValidator, (req: Request, res: Response, next: NextFunction) => this.createEvent(req, res, next)];
  }

  public getEventByNameWithValidation() {
    return [getEventByNameValidator, (req: Request, res: Response, next: NextFunction) => this.getEventByName(req, res, next)];
  }

  private raiseError(err:any, method: string, next: NextFunction){
    if (err instanceof CustomError) {
      next(err);
    } else {
      const internalError: CustomError = new CustomError(ErrorCode.INTERNAL_SERVER_ERROR, typeErrors.CONTROLLER_ERROR, method, err); 
      next(internalError);
    }
  }
}