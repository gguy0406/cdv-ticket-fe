import { getEventDetail } from '@/services/event';

import EventFormWrapper from '../../_components/event-form-wrapper';

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const event = await getEventDetail(params.id);

  return <EventFormWrapper event={event} />;
}
