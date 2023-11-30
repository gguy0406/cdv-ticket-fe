import Button from '@mui/material/Button';

import { getEvents } from '@/services/event';

import EventList from './_components/event-list';

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
