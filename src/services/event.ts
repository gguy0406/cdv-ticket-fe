import { InferType, array, object, string } from 'yup';

import { CDVEvent, EventType } from '@/interfaces/event';
import { BASE_URL } from '@/lib/constants';
import { wrappedFetchWithJWT } from '@/lib/wrapped-fetch';

const eventRoute = `${BASE_URL}/api/events`;

export type CreateEventDto = InferType<typeof createEventSchema>;
export type UpdateEventDto = InferType<typeof updateEventSchema>;

export const createEventSchema = object({
  name: string().required(),
  location: string().required(),
  description: string().required(),
  typeIds: array().of(string()),
  logoId: string(),
  bannerId: string(),
  customerId: string(),
});

export const updateEventSchema = object({
  name: string(),
  location: string(),
  description: string(),
  typeIds: array().of(string()),
  logoId: string(),
  bannerId: string(),
  customerId: string(),
});

export async function getEvents() {
  return wrappedFetchWithJWT<{ data: CDVEvent[]; hasNextPage: boolean }>(`${eventRoute}/get`, { method: 'POST' });
}

export async function getEventDetail(id: string) {
  return wrappedFetchWithJWT<CDVEvent>(`${eventRoute}/${id}`, { method: 'GET' });
}

export async function createEvent(data: CreateEventDto) {
  return wrappedFetchWithJWT<void>(eventRoute, { method: 'POST', body: JSON.stringify(data) });
}

export async function updateEvent(id: string, data: UpdateEventDto) {
  return wrappedFetchWithJWT<void>(`${eventRoute}/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}

export async function submitEvent(id: string) {
  return wrappedFetchWithJWT<void>(`${eventRoute}/${id}/submit`, { method: 'PATCH' });
}

export async function approveEvent(id: string) {
  return wrappedFetchWithJWT<void>(`${eventRoute}/${id}/approve`, { method: 'PATCH' });
}

export async function deleteEvent(id: string) {
  return wrappedFetchWithJWT<void>(`${eventRoute}/${id}`, { method: 'DELETE' });
}

export async function getEventTypes() {
  return wrappedFetchWithJWT<EventType[]>(`${BASE_URL}/api/event-types`, { method: 'GET' });
}
