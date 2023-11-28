'use server';

import { array, number, object, string } from 'yup';

import { CDVEvent, EventType } from '@/interfaces/event';
import { BASE_URL } from '@/lib/constants';
import { wrappedFetch, wrappedFetchWithJWT } from '@/lib/wrappedFetch';
import parseFormData from '@/lib/parseFormData';

const createEventSchema = object({
  name: string().required(),
  location: string().required(),
  description: string().required(),
  typeIds: array().of(number()),
  logoId: string(),
  bannerId: string(),
  customerId: string(),
});

const updateEventSchema = object({
  name: string(),
  location: string(),
  description: string(),
  typeIds: array().of(number()),
  logoId: string(),
  bannerId: string(),
  customerId: string(),
});

const eventRoute = `${BASE_URL}/api/events`;

export async function getEvents() {
  return wrappedFetchWithJWT<{ data: CDVEvent[]; hasNextPage: boolean }>(`${eventRoute}/get`, { method: 'POST' });
}

export async function getEventDetail(id: string) {
  return wrappedFetchWithJWT<CDVEvent>(`${eventRoute}/${id}`, { method: 'GET' });
}

export async function createEvent(_prevState: HttpResponse | undefined, formData: FormData) {
  const parsedData = parseFormData(createEventSchema, formData);

  if (!parsedData.status) delete parsedData.status;

  try {
    await createEventSchema.validate(parsedData);
  } catch (error) {
    return { statusCode: 400, error: 'Bad Request', message: (error as Error).message } satisfies HttpResponse;
  }

  try {
    await wrappedFetchWithJWT<void>(eventRoute, { method: 'POST', body: JSON.stringify(parsedData) });

    return { statusCode: 200 } satisfies HttpResponse;
  } catch (error) {
    return error as HttpResponse;
  }
}

export async function updateEvent(_prevState: HttpResponse | undefined, formData: FormData) {
  const parsedData = parseFormData(updateEventSchema, formData);

  if (!parsedData.status) delete parsedData.status;

  try {
    await updateEventSchema.validate(parsedData);
  } catch (error) {
    return { statusCode: 400, error: 'Bad Request', message: (error as Error).message } satisfies HttpResponse;
  }

  try {
    await wrappedFetchWithJWT<void>(`${eventRoute}/${formData.get('id')}`, {
      method: 'PUT',
      body: JSON.stringify(parsedData),
    });

    return { statusCode: 200 } satisfies HttpResponse;
  } catch (error) {
    return error as HttpResponse;
  }
}

export async function submitEvent(id: string) {
  try {
    await wrappedFetchWithJWT<void>(`${eventRoute}/${id}/submit`, { method: 'PATCH' });

    return { statusCode: 200 } satisfies HttpResponse;
  } catch (error) {
    return error as HttpResponse;
  }
}

export async function approveEvent(id: string) {
  try {
    await wrappedFetchWithJWT<void>(`${eventRoute}/${id}/approve`, { method: 'PATCH' });

    return { statusCode: 200 } satisfies HttpResponse;
  } catch (error) {
    return error as HttpResponse;
  }
}

export async function deleteEvent(id: string) {
  try {
    await wrappedFetchWithJWT<void>(`${eventRoute}/${id}`, { method: 'DELETE' });

    return { statusCode: 200 } satisfies HttpResponse;
  } catch (error) {
    return error as HttpResponse;
  }
}

export async function getEventTypes() {
  return wrappedFetchWithJWT<EventType[]>(`${BASE_URL}/api/event-types`, { method: 'GET' });
}
