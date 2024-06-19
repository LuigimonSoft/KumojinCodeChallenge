import axios from "axios";

import { EventModel } from "../models/eventModel";
import { EventError } from "../models/eventError";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getEvents = async (): Promise<EventModel[]> => {
  try {
    const response = await apiClient.get("/events");
    return response.data;
  } catch (error) {
    console.error("EventServices - getEvents:", error);
    throw error;
  }
};

export const createEvent = async (event: EventModel): Promise<EventModel> => {
  try {
    const response = await apiClient.post("/events", event);
    return response.data;
  } catch (error) {
    console.error("EventServices - createEvent:", error);
    throw error;
  }
};

export const getEventByName = async (name: string): Promise<EventModel[] | EventError> => {
  try {
    const response = await apiClient.get(`/events/${name}`);
    return response.data;
  } catch (error) {
    console.error("EventServices - getEventByName:", error);
    throw error;
  }
};