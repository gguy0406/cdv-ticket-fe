import Box from '@mui/material/Box';

import { getEvents } from '@/services/public-event';

import Nav from './_components/nav';
import EventGrid from './_components/event-grid';

export default async function Home() {
  const events = (await getEvents()).data;

  return (
    <>
      <Nav />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {events?.length ? <EventGrid events={events} /> : <h1>Empty page</h1>}
      </Box>
    </>
  );
}
