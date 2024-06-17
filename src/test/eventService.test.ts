import { expect } from 'chai';
import sinon, { createStubInstance, restore } from 'sinon';
import { addDays } from 'date-fns';

import { EventService } from '../services/eventService';
import { Event } from '../models/event';
import { EventRepository } from '../repositories/eventRepository';
import { ErrorCode } from '../utils/errorCodes';
import { CustomError } from '../utils/customError';
describe('EventService', () => {
  let eventService: EventService;
  let eventRepository: sinon.SinonStubbedInstance<EventRepository>;

  const startDate: Date = new Date();
  const endDate = addDays(startDate, 1);

  beforeEach(() => {
    eventRepository = createStubInstance(EventRepository);
    eventService = new EventService(eventRepository);
  });

  afterEach(() => {
    restore();
  });

  describe('createEvent', () => {

    
    it('should create a new event', async () => {
      const event = new Event('event1', 'description1', startDate.toISOString(), endDate.toISOString());
      const eventExpected = new Event('event1', 'description1', startDate.toISOString(), endDate.toISOString());
      eventExpected.id = 1;
      
      const createEventStub = eventRepository.createEvent.resolves(eventExpected);

      const result = await eventService.createEvent(event);

      expect(result.id).to.be.equal(eventExpected.id);
      expect(result.name).to.be.equal(eventExpected.name);
      expect(result.description).to.be.equal(eventExpected.description);
      expect(result.startDate).to.be.equal(eventExpected.startDate);
      expect(result.endDate).to.be.equal(eventExpected.endDate);
      expect(createEventStub.calledOnce).to.be.true;
    });

    
    it('should throw an error if the start date in the event is greater than end date}', async () => {
      try {
        const event = new Event('event1', 'description1', startDate.toISOString(), addDays(endDate, -2).toISOString());
        
        await eventService.createEvent(event);

      } catch (error) {
        expect(error).to.be.instanceOf(CustomError);
        expect((error as CustomError).code).to.equal(ErrorCode.STARTDATE_GREATER_THAN_ENDDATE);
        expect((error as CustomError).status).to.equal(400);
      }
    });
  });

  describe('getEvents', () => {
    it('should get all events', async () => {
      const eventsExpected = [
        new Event('event1', 'description1', startDate.toISOString(), endDate.toISOString()),
        new Event('event2', 'description2', startDate.toISOString(), endDate.toISOString())
      ];
      eventsExpected[0].id = 1;
      eventsExpected[1].id = 2;

      const getEventsStub = eventRepository.getEvents.resolves(eventsExpected);

      const result = await eventService.getEvents();

      expect(result.length).to.be.equal(eventsExpected.length);
      expect(result[0].id).to.be.equal(eventsExpected[0].id);
      expect(result[0].name).to.be.equal(eventsExpected[0].name);
      expect(result[1].id).to.be.equal(eventsExpected[1].id);
      expect(result[1].name).to.be.equal(eventsExpected[1].name);
      expect(getEventsStub.calledOnce).to.be.true;
    });

    it('should return an empty array if there are no events', async () => {
      const eventsExpected: Event[] = [];

      const getEventsStub = eventRepository.getEvents.resolves(eventsExpected);

      const result = await eventService.getEvents();

      expect(result).to.deep.equal(eventsExpected);
      expect(getEventsStub.calledOnce).to.be.true;
    });
  });

  describe('getEventsByName', () => {
    it('should get an event by name', async () => {
      const name = 'event1';
      const eventExpected = [
        new Event(name, 'description1', startDate.toISOString(), endDate.toISOString())
      ];
      eventExpected[0].id = 1;

      const getEventByNameStub = eventRepository.getEventByName.resolves(eventExpected);

      const result = await eventService.getEventByName(name);
      if(result !== null)
        expect(result[0].name).to.be.equal(name);
      expect(getEventByNameStub.calledOnce).to.be.true;
    });

    it('should return an error if the event is not found', async () => {
      const name = 'event1';
      const getEventByNameStub = eventRepository.getEventByName.resolves(null);

      try {
        await eventService.getEventByName(name);
      } catch (error) {
        expect(getEventByNameStub.calledOnce).to.be.true;
        expect(error).to.be.instanceOf(CustomError);
        expect((error as CustomError).code).to.equal(ErrorCode.EVENT_NOT_FOUND);
        expect((error as CustomError).status).to.equal(404);
      }      
    });
  });

});