import { auth } from '@/auth';
import { Customer } from '@/interfaces/customer';
import { CDVEvent } from '@/interfaces/event';
import { ALLOW_ACCESS_ROUTE } from '@/lib/constants';
import { getCustomers } from '@/services/customers';
import { getEventTypes } from '@/services/event';

import EventForm from './event-form';

export default async function EventFormWrapper({ event }: { event?: CDVEvent }) {
  const session = await auth();
  const eventTypes = await getEventTypes();

  let customers: Customer[] = [];

  if (ALLOW_ACCESS_ROUTE['/customers'].includes(session!.user.role?.name)) customers = (await getCustomers()).data;

  return <EventForm customers={customers} eventTypes={eventTypes} event={event} />;
}
