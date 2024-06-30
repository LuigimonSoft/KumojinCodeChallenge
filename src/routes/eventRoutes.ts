import { Router } from 'express';

import { EventController } from '../controllers/eventController';
import { Container } from '../infrastructure/container';

export function EventRoutes(container: Container): Router {
  const router = Router();
  const eventController = new EventController(container.resolve('IEventService'));
  /**
   * @swagger
   * /api/v1/events:
   *  get:
   *    tags:
   *    - Event controller
   *    summary: Get all events from the events list
   *    responses:
   *      200:
   *         description: return a list of events from the events list
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 mensaje:
   *                   type: json
   *                   example: [{ "id":1, "name": "event1", "description": "description1", "startDate": "2024-07-20T09:00:00+00:00", "endDate": "2024-07-20T17:00:00+00:00" }, { "id":2, "name": "event2", "description": "description2", "startDate": "2024-07-20T09:00:00+00:00", "endDate": "2024-07-20T17:00:00+00:00" }]
   *      500:
   *        description: Internal server error
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                mensaje:
   *                  type: json
   *                  example: {"detail": "","type": "","code": 5001,"title": "Internal server error","status": 500,"instance": "getEvents","additionalProperties": {} }
  */
  router.get('/events', eventController.getEvents);

  /**
   * @swagger
   * /api/v1/events:
   *  post:
   *    tags:
   *    - Event controller
   *    summary: Create a new event in the events list
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            required:
   *              - name
   *              - description
   *              - startDate
   *              - endDate
   *            properties:
   *              name:
   *                type: string
   *                example: event1
   *              description:
   *                type: string
   *                exmple: event description 1
   *              startDate:
   *                type: string
   *                format: date-time-with-timezone
   *                example: 2024-07-20T09:00:00+00:00
   *              endDate:
   *                type: string
   *                format: date-time-with-timezone
   *                example: 2024-07-20T09:00:00+00:00
   *    responses:
   *      201:
   *         description: return the created event
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 mensaje:
   *                   type: json
   *                   example: [{ "id":1, "name": "event1", "description": "description1", "startDate": "2024-07-20T09:00:00+00:00", "endDate": "2024-07-20T17:00:00+00:00" }]
   *      500:
   *        description: Internal server error
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                mensaje:
   *                  type: json
   *                  example: {"detail": "","type": "","code": 5001,"title": "Internal server error","status": 500,"instance": "getEvents","additionalProperties": {} }
  */
  router.post('/events', eventController.createEventWithValidation());

  /**
   * @swagger
   * /api/v1/events/{name}:
   *  get:
   *    tags:
   *    - Event controller
   *    summary: Get a single event from a list of events that match the name specified
   *    parameters:
   *      - in: path
   *        name: name
   *        required: true
   *        type: string
   *    responses:
   *      200:
   *         description: return a single event from a list of events that match the name specified
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 mensaje:
   *                   type: json
   *                   example: { "id":1, "name": "event1", "description": "description1", "startDate": "2024-07-20T09:00:00+00:00", "endDate": "2024-07-20T17:00:00+00:00" }
   *      500:
   *        description: Internal server error
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                mensaje:
   *                  type: json
   *                  example: {"detail": "","type": "","code": 5001,"title": "Internal server error","status": 500,"instance": "getEvents","additionalProperties": {} }
  */
  router.get('/events/:name', eventController.getEventByNameWithValidation());

  return router;
}