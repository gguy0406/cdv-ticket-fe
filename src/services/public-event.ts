import { CDVEvent } from '@/interfaces/event';
import { BASE_URL } from '@/lib/constants';
import { wrappedFetch } from '@/lib/wrapped-fetch';

const eventRoute = `${BASE_URL}/api/public/events`;

export async function getEvents() {
  return wrappedFetch<{ data: CDVEvent[]; hasNextPage: boolean }>(`${eventRoute}`, { method: 'POST' });
}

export async function getEventDetail(id: string) {
  return wrappedFetch<CDVEvent>(`${eventRoute}/${id}`, { method: 'GET' });
}
