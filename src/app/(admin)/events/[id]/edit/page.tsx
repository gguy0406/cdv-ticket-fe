import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { getCustomers } from '../../../customers/_actions';

import { getEventDetail, getEventTypes } from '../../_actions';
import EventForm from '../../_components/EventForm';

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const event = await getEventDetail(params.id);
  const customers = (await getCustomers()).data;
  const eventTypes = await getEventTypes();

  return (
    <Box
      sx={{
        marginTop: 8,
        marginX: 10,
        width: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Create New Event
      </Typography>
      <EventForm customers={customers} eventTypes={eventTypes} event={event} />
    </Box>
  );
}
