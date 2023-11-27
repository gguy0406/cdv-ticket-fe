import { auth } from '@/auth';
import { Customer } from '@/interfaces/customer';
import { CDVEvent } from '@/interfaces/event';
import { ALLOW_ACCESS_ROUTE } from '@/lib/constants';

import { getCustomers } from '../../customers/_actions';

import { getEventTypes } from '../_actions';
import EventForm from '../_components/EventForm';

export default async function EventFormWrapper({ event }: { event?: CDVEvent }) {
  const session = await auth();
  const eventTypes = await getEventTypes();

  let customers: Customer[] = [];

  if (ALLOW_ACCESS_ROUTE['/customers'].includes(session!.user.role?.name)) customers = (await getCustomers()).data;

  return <EventForm customers={customers} eventTypes={eventTypes} event={event} />;
}
