import { getEventDetail } from '../../_actions';
import EventFormWrapper from '../../_components/EventFormWrapper';

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const event = await getEventDetail(params.id);

  return <EventFormWrapper event={event} />;
}
