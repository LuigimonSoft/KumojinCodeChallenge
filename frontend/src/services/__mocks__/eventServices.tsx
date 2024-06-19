import { vi } from 'vitest';
import { EventModel } from '../../models/eventModel';

export const getEvents = vi.fn().mockResolvedValue([
  {
    id: 1,
    name: 'Event 1',
    description: 'Description 1',
    startDate: "2024-07-20T09:00:00+09:00",
    endDate: "2024-07-20T17:00:00+09:00"
  },
  {
    id: 2,
    name: 'Event 2',
    description: 'Description 2',
    startDate: "2024-07-20T09:00:00+09:00",
    endDate: "2024-07-20T17:00:00+09:00"
  },
]);

export const getEventByName = vi.fn().mockResolvedValue([
  {
    id: 1,
    name: 'Event 1',
    description: 'Description 1',
    startDate: "2024-07-20T09:00:00+09:00",
    endDate: "2024-07-20T17:00:00+09:00"
  },
]);

export const createEvent = vi.fn().mockResolvedValue([
  {
    id: 1,
    name: 'Event 1',
    description: 'Description 1',
    startDate: "2024-07-20T09:00:00+09:00",
    endDate: "2024-07-20T17:00:00+09:00"
  },
]);
