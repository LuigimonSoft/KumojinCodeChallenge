import { Request, Response, NextFunction } from 'express';
import { expect } from 'chai';
import sinon, { createStubInstance, restore, stub } from 'sinon';
import { addDays } from 'date-fns';

import { EventController } from '../controllers/eventController';
import { EventService } from '../services/eventService';
import { Event } from '../models/event';
import { ErrorCode } from '../utils/errorCodes';
import { CustomError } from '../utils/customError';

describe('EventController', () => {
  let eventController: EventController;
  let eventService: sinon.SinonStubbedInstance<EventService>;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: Partial<NextFunction>;
  let statusStub: sinon.SinonStub;
  let jsonStub: sinon.SinonStub;
  let sendStub: sinon.SinonStub;
 
  const startDate: Date = new Date();
  const endDate = addDays(startDate, 1);

  beforeEach(() => {
    eventService = createStubInstance(EventService);
    eventController = new EventController(eventService);
    
    req = {};
    statusStub = stub();
    jsonStub = stub();
    sendStub = stub();
    res = {
      status: statusStub.returns({ json: jsonStub, send: sendStub })
    };
    next = stub();
  });

  afterEach(() => {
    restore();
  });

  describe('createEvent', () => {
    it('should create a new event', async () => {
      const event = new Event('event1', 'description1', startDate.toISOString(), endDate.toISOString());
      const eventExpected = new Event('event1', 'description1', startDate.toISOString(), endDate.toISOString());
      eventExpected.id = 1;

      req.body = event;

      const createEventStub = eventService.createEvent.resolves(eventExpected);

      await eventController.createEvent(req as Request, res as Response, next as NextFunction);

      expect(createEventStub.calledOnce).to.be.true;
      expect(statusStub.calledOnceWith(201)).to.be.true;
      expect(jsonStub.calledOnceWith(eventExpected)).to.be.true;
    });
  });

  describe('getEventByName', () => {
    it('should get an event by name', async () => {
      const event = [ new Event('event1', 'description1', startDate.toISOString(), endDate.toISOString())];
      const name = 'event1';

      req.params = { name };

      const getEventByNameStub = eventService.getEventByName.resolves(event);

      await eventController.getEventByName(req as Request, res as Response, next as NextFunction);

      expect(getEventByNameStub.calledOnceWith(name)).to.be.true;
      expect(statusStub.calledOnceWith(200)).to.be.true;
      expect(jsonStub.calledOnceWith(event)).to.be.true;
    });

    it('should throw an error if the event is not found', async () => {
      
      const name = 'event1';
      req.params = { name };

      const getEventByNameStub = eventService.getEventByName.resolves(null);
      
      try {
        await eventController.getEventByName(req as Request, res as Response, next as NextFunction);
      } catch (error) {
        expect(getEventByNameStub.calledOnceWith(name)).to.be.true;
        expect(error).to.be.instanceOf(CustomError);
        expect((error as CustomError).code).to.equal(ErrorCode.EVENT_NOT_FOUND);
        expect((error as CustomError).status).to.equal(404);
        expect(statusStub.calledOnceWith(404)).to.be.true;
        expect(sendStub.calledOnce).to.be.true;
      }
    });
  });

  describe('getEvents', () => {
    it('should get all events', async () => {
      const events = [
        new Event('event1', 'description1', startDate.toISOString(), endDate.toISOString()),
        new Event('event2', 'description2', startDate.toISOString(), endDate.toISOString())
      ];
      events[0].id = 1;
      events[1].id = 2;

      const getEventsStub = eventService.getEvents.resolves(events);

      await eventController.getEvents(req as Request, res as Response, next as NextFunction);

      expect(getEventsStub.calledOnce).to.be.true;
      expect(statusStub.calledOnceWith(200)).to.be.true;
      expect(jsonStub.calledOnceWith(events)).to.be.true;
    });

    it('should return an empty array if there are no events', async () => {
      const events: Event[] = [];

      const getEventsStub = eventService.getEvents.resolves(events);

      await eventController.getEvents(req as Request, res as Response, next as NextFunction);

      expect(getEventsStub.calledOnce).to.be.true;
      expect(statusStub.calledOnceWith(200)).to.be.true;
      expect(jsonStub.calledOnceWith(events)).to.be.true;
    });
  });
});