import MockAdapter from 'axios-mock-adapter';
import { describe, it, beforeAll, afterEach, afterAll, expect } from 'vitest';
import { apiClient, getEvents, getEventByName, createEvent } from './eventServices';
import { EventModel } from '../models/eventModel';

describe('Event services', () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => mock.reset());

  it('get events', async () => {
    const mockEvents: EventModel[] = [
      {
        name: 'Event 1',
        description: 'Description 1',
        startDate: "2024-07-20T09:00:00+09:00",
        endDate: "2024-07-20T17:00:00+09:00"
      },
      {
        name: 'Event 2',
        description: 'Description 2',
        startDate: "2024-07-20T09:00:00+09:00",
        endDate: "2024-07-20T17:00:00+09:00"
      }
    ];

    mock.onGet('/events').reply(200, mockEvents);

    const eventsResult = await getEvents();

    expect(eventsResult).toHaveLength(2);
    expect(eventsResult[0].name).toBe(mockEvents[0].name);
    expect(eventsResult[1].name).toBe(mockEvents[1].name)
  });

  it('get events by name', async () => {
    const nameExpected = 'test';

    const mockEvents: EventModel[] = [
      {
        name: 'test event',
        description: 'Description 1',
        startDate: "2024-07-20T09:00:00+09:00",
        endDate: "2024-07-20T17:00:00+09:00"
      }
    ];

    mock.onGet(`/events/${nameExpected}`).reply(200, mockEvents);

    const eventsResult = await getEventByName(nameExpected);

    expect(eventsResult).toHaveLength(1);
    expect(eventsResult[0].name).toBe(mockEvents[0].name);
    expect(eventsResult[0].description).toBe(mockEvents[0].description);
  });

  it('creates a new event', async () => {
    const newEvent: EventModel = {
      name: 'New Event',
      description: 'New Description',
      startDate: "2024-07-20T09:00:00+09:00",
      endDate: "2024-07-20T17:00:00+09:00"
    };

    mock.onPost('/events').reply(201, newEvent);

    const createdEvent = await createEvent(newEvent);
    expect(createdEvent).toEqual(newEvent);
  });
});