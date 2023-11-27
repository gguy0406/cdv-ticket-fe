'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { redirect } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';

import { Customer } from '@/interfaces/customer';
import { CDVEvent, EventStatusEnum, EventType } from '@/interfaces/event';

import { createEvent, updateEvent } from '../_actions';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';

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

  return (
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
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {[
            { id: 1, name: 'Music' },
            { id: 2, name: 'Contest' },
          ].map((eventType) => (
            <MenuItem key={eventType.id} value={eventType.id}>
              {eventType.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
          disabled={!customers.length}
          inputProps={{ id: 'select-customer', name: 'customerId' }}
        >
          {customers.map((customer) => (
            <MenuItem key={customer.id} value={customer.id}>
              {customer.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <SubmitButton label={event ? 'Update' : 'Create'} />
      {state?.message && <div className="text-red-500">{state.message}</div>}
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
