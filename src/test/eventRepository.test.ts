import { expect } from 'chai';
import sinon, { createStubInstance, restore } from 'sinon';

import { Event } from '../models/event';
import { EventRepository } from '../repositories/eventRepository';
import { ErrorCode } from '../utils/errorCodes';
import { CustomError } from '../utils/customError';

describe('EventRepository', () => {
  let eventRepository: EventRepository;
  const startDate: string = new Date().toISOString();
  const endDate: string = new Date().toISOString();

  beforeEach(() => {
    eventRepository = new EventRepository();
  });

  afterEach(() => {
    restore();
  });

  describe('createEvent', () => {
    it('should create a new event', async () => {
      const event = new Event('event1', 'description1', startDate, endDate);
      const eventExpected = new Event('event1', 'description1', startDate, endDate);
      eventExpected.id = 1;

      const result = await eventRepository.createEvent(event);

      expect(result.id).to.be.equal(eventExpected.id);
      expect(result.name).to.be.equal(eventExpected.name);
      expect(result.description).to.be.equal(eventExpected.description);
      expect(result.startDate).to.be.equal(eventExpected.startDate);
      expect(result.endDate).to.be.equal(eventExpected.endDate);
    });

    it('should throw an error if an error occurs', async () => {
      const event = new Event('event1', 'description1', startDate, endDate);
      const error = new Error('Error creating event');

      const eventRepositoryStub: sinon.SinonStubbedInstance<EventRepository> = createStubInstance(EventRepository);
      eventRepositoryStub.createEvent.throws(error);

      try {
        await eventRepository.createEvent(event);
      } catch (error) {
        expect(error).to.be.instanceOf(CustomError);
        expect((error as CustomError).code).to.equal(ErrorCode.DATABASE_ERROR);
        expect((error as CustomError).status).to.equal(500);
      }
    });
  });

  describe('getEvents', () => {
    it('should return a list of events', async () => {
      const result = await eventRepository.getEvents();

      expect(result).to.be.an('array');
    });

    it('should throw an error if an error occurs', async () => {
      const error = new Error('Error getting events');

      const eventRepositoryStub: sinon.SinonStubbedInstance<EventRepository> = createStubInstance(EventRepository);
      eventRepositoryStub.getEvents.throws(error);

      try {
        await eventRepository.getEvents();
      } catch (error) {
        expect(error).to.be.instanceOf(CustomError);
        expect((error as CustomError).code).to.equal(ErrorCode.DATABASE_ERROR);
        expect((error as CustomError).status).to.equal(500);
      }
    });
  });

  describe('getEventByName', () => {
    it('should return an event by name', async () => {
      const name = 'event1';
      const event = new Event(name, 'description1', startDate, endDate);

      await eventRepository.createEvent(event)
      
      const result = await eventRepository.getEventByName(name);

      if (result === null) {
        expect(result).to.not.be.null;
      }
      else {
        expect(result).to.be.an('array');
        expect(result[0].name).to.be.equal(event.name);
      }
    });

    it('should return null if the event is not found', async () => {
      const name = 'event1';

      const result = await eventRepository.getEventByName(name);

      expect(result).to.be.an('array');
      expect(result).to.be.empty;
    });

    it('should throw an error if an error occurs', async () => {
      const name = 'event1';
      const error = new Error('Error getting event by name');

      const eventRepositoryStub: sinon.SinonStubbedInstance<EventRepository> = createStubInstance(EventRepository);
      eventRepositoryStub.getEventByName.throws(error);

      try {
        await eventRepository.getEventByName(name);
      } catch (error) {
        expect(error).to.be.instanceOf(CustomError);
        expect((error as CustomError).code).to.equal(ErrorCode.DATABASE_ERROR);
        expect((error as CustomError).status).to.equal(500);
      }
    });
  });
});