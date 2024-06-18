import request from 'supertest';
import { expect } from 'chai';
import { addDays } from 'date-fns';

import app from '../index';
import { ErrorCode } from '../utils/errorCodes';

describe('Event API Integration test', () => {
  const startDate: Date = new Date();
  const endDate = addDays(startDate, 1);

  const testErrorCases = [
    { name: '', description: 'description1', startDate: startDate, endDate: endDate, ErrorCode: ErrorCode.NAME_EMPTY, httpStatus: 400},
    { name: '1234567890123456789012345678901234567', description: 'description1', startDate: startDate, endDate: endDate, ErrorCode: ErrorCode.NAME_MAX_LENGTH, httpStatus: 400 },
    { name: 'event1', description: '', startDate: startDate, endDate: endDate, ErrorCode: ErrorCode.DESCRIPTION_EMPTY, httpStatus: 400 },
    { name: 'event1', description: 'description1', startDate: '12-10-2024', endDate: endDate, ErrorCode: ErrorCode.STARTDATE_INVALID_FORMAT, httpStatus: 400 },
    { name: 'event1', description: 'description1', startDate: startDate, endDate: '12-10-2024', ErrorCode: ErrorCode.ENDDATE_INVALID_FORMAT, httpStatus: 400 }
  ];

  const testEvent = { name: 'event1', description: 'description1', startDate: startDate.toISOString(), endDate: endDate.toISOString() };

  describe('POST /events', () => {
    it('should create a new event', async () => {
      const response = await request(app)
        .post('/api/v1/events')
        .send(testEvent);

      expect(response.status).to.equal(201);
      expect(response.body['name']).to.be.equal(testEvent.name);
    });

    it('should return an error for every error case in testErrorCases', async () => {
      for (const testCase of testErrorCases) {
        try {
          const response = await request(app)
            .post('/api/v1/events')
            .send(testCase);
        
          expect(response.status).to.equal(testCase.httpStatus);
          expect(response.body[0]['code']).to.equal(testCase.ErrorCode);
        } catch (error) {
          console.log(error);
        }
      }
    });
  });

  describe('GET /events', () => {
    it('should return a list of events', async () => {
      const response = await request(app)
        .get('/api/v1/events');

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
    });
  });

  describe('GET /events/:name', () => {
    it('should return an event by name', async () => {
      const nameExpected = 'event1';
      await request(app)
        .post('/api/v1/events')
        .send(testEvent);
      
      const response = await request(app)
        .get(`/api/v1/events/${nameExpected}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body[0]['name']).to.be.equal(nameExpected);
    });

    it('should return an error if the event is not found', async () => {
      const response = await request(app)
        .get('/api/v1/events/event2');

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.be.empty;
    });

    it('should return an error if the name is not valid', async () => {
      const response = await request(app)
        .get('/api/v1/events/1234567890123456789012345678901234567');

      expect(response.status).to.equal(400);
      expect(response.body[0]['code']).to.equal(ErrorCode.NAME_MAX_LENGTH);
    });
  });
});