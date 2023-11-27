import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { getCustomers } from '../../customers/_actions';

import { getEventTypes } from '../_actions';
import EventForm from '../_components/EventForm';

export default async function NewCustomerPage() {
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
      <EventForm customers={customers} eventTypes={eventTypes} />
    </Box>
  );
}
