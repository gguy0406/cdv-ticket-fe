'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { redirect } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';

import { createEvent, updateEvent } from '@/actions/event';
import { Customer } from '@/interfaces/customer';
import { CDVEvent, EventType } from '@/interfaces/event';

interface Props {
  customers: Customer[];
  eventTypes: EventType[];
  event?: CDVEvent;
}

export default function EventForm({ customers, eventTypes, event }: Props) {
  const [state, dispatch] = useFormState(async function (state: HttpResponse | undefined, payload: FormData) {
    let res: HttpResponse;

    if (event) {
      payload.append('id', event.id);
      res = await updateEvent(state, payload);
    } else {
      res = await createEvent(state, payload);
    }

    if (res.statusCode === 200) redirect('/events');

    return res;
  }, undefined);

  const eventTypesMap = eventTypes.reduce((map: Record<string, string>, eventType) => {
    map[eventType.id] = eventType.name;

    return map;
  }, {});

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
        {event ? 'Update Event' : 'Create New Event'}
      </Typography>
      <Box component="form" action={dispatch} sx={{ mt: 1 }}>
        <TextField
          required
          autoFocus
          fullWidth
          name="name"
          autoComplete="off"
          defaultValue={event?.name}
          label="Name"
          margin="normal"
        />
        <TextField
          required
          fullWidth
          name="location"
          autoComplete="off"
          defaultValue={event?.location}
          label="Location"
          margin="normal"
        />
        <TextField
          required
          fullWidth
          name="description"
          autoComplete="off"
          defaultValue={event?.description}
          label="Description"
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="select-type-label" htmlFor="select-type">
            Type
          </InputLabel>
          <Select
            multiple
            labelId="select-type-label"
            defaultValue={event?.type?.map((type) => type.id) || []}
            input={<OutlinedInput id="select-type" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={eventTypesMap[value]} />
                ))}
              </Box>
            )}
          >
            {eventTypes.map((eventType) => (
              <MenuItem key={eventType.id} value={eventType.id}>
                {eventType.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {!!customers?.length && (
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-customer-label" htmlFor="select-customer">
              Customer
            </InputLabel>
            <Select
              labelId="select-customer-label"
              defaultValue={
                (event?.customer?.id && customers.find((customer) => customer.id === event.customer!.id)?.id) || ''
              }
              label="Customer"
              inputProps={{ id: 'select-customer', name: 'customerId' }}
            >
              {customers.map((customer) => (
                <MenuItem key={customer.id} value={customer.id}>
                  {customer.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <SubmitButton label={event ? 'Update' : 'Create'} />
        {state?.message && <div className="text-red-500">{state.message}</div>}
      </Box>
    </Box>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <Button fullWidth type="submit" variant="contained" aria-disabled={pending} sx={{ mt: 3, mb: 2 }}>
      {label}
    </Button>
  );
}
