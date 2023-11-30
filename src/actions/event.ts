'use server';

import { revalidatePath } from 'next/cache';

import { parseFormData } from '@/lib/parse-form-data';
import { wrappedFetchAction, wrappedValidateAction } from '@/lib/wrapped-action';
import {
  CreateEventDto,
  UpdateEventDto,
  approveEvent as approveEventService,
  createEvent as createEventService,
  createEventSchema,
  deleteEvent as deleteEventService,
  submitEvent as submitEventService,
  updateEvent as updateEventService,
  updateEventSchema,
} from '@/services/event';

export async function createEvent(_prevState: HttpResponse | undefined, formData: FormData) {
  const parsedData = parseFormData(createEventSchema, formData);

  if (parsedData.typeIds) parsedData.typeIds = parsedData.typeIds.split(',');
  else delete parsedData.typeIds;

  const validationError = await wrappedValidateAction(createEventSchema.validate(parsedData));

  if (validationError) return validationError;

  return wrappedFetchAction(createEventService(parsedData as CreateEventDto));
}

export async function updateEvent(_prevState: HttpResponse | undefined, formData: FormData) {
  const parsedData = parseFormData(updateEventSchema, formData);

  if (parsedData.typeIds) parsedData.typeIds = parsedData.typeIds.split(',');
  else delete parsedData.typeIds;

  const validationError = await wrappedValidateAction(updateEventSchema.validate(parsedData));

  if (validationError) return validationError;

  const res = await wrappedFetchAction(updateEventService(formData.get('id') as string, parsedData as UpdateEventDto));

  if (res.statusCode === 200) revalidatePath('/events');

  return res;
}

export async function submitEvent(id: string) {
  const res = await wrappedFetchAction(submitEventService(id));

  if (res.statusCode === 200) revalidatePath('/events');
  if (res.statusCode === 200) revalidatePath('/');

  return res;
}

export async function approveEvent(id: string) {
  const res = await wrappedFetchAction(approveEventService(id));

  if (res.statusCode === 200) revalidatePath('/events');
  if (res.statusCode === 200) revalidatePath('/');

  return res;
}

export async function deleteEvent(id: string) {
  return wrappedFetchAction(deleteEventService(id));
}
