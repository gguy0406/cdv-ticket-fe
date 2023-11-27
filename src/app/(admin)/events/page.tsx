import Button from '@mui/material/Button';

import { getEvents } from './_actions';
import EventList from './_components/EventList';

export default async function EventsPage() {
  const events = (await getEvents()).data;

  return (
    <>
      <Button href="/events/new" variant="outlined">
        New Event
      </Button>
      <EventList events={events} />
    </>
  );
}
