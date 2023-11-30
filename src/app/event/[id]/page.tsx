import { getEventDetail } from '@/services/public-event';

import EventDetail from '@/components/feature/event-detail';

export default async function EventPage({ params: { id } }: { params: { id: string } }) {
  const event = await getEventDetail(id);

  return <EventDetail event={event} />;
}
