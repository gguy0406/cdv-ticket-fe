'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { redirect } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';

import { createCustomer, updateCustomer } from '@/actions/customer';
import { Customer, CustomerStatusEnum } from '@/interfaces/customer';

export default function CustomerForm({ customer }: { customer?: Customer }) {
  const [state, dispatch] = useFormState(async function (state: HttpResponse | undefined, payload: FormData) {
    let res: HttpResponse;

    if (customer) {
      payload.append('id', customer.id);
      res = await updateCustomer(state, payload);
    } else {
      res = await createCustomer(state, payload);
    }

    if (res.statusCode === 200) redirect('/customers');

    return res;
  }, undefined);

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
        {customer ? 'Update Customer' : 'Create New Customer'}
      </Typography>
      <Box component="form" action={dispatch} sx={{ mt: 1 }}>
        <TextField
          required
          autoFocus
          fullWidth
          name="name"
          autoComplete="off"
          defaultValue={customer?.name}
          label="Name"
          margin="normal"
        />
        <TextField
          required
          fullWidth
          name="taxNumber"
          autoComplete="off"
          defaultValue={customer?.taxNumber}
          label="Tax number"
          margin="normal"
        />
        <TextField
          required
          fullWidth
          type="email"
          name="email"
          autoComplete="off"
          defaultValue={customer?.email}
          label="Email"
          margin="normal"
        />
        <TextField
          required
          fullWidth
          name="phoneNumber"
          autoComplete="off"
          defaultValue={customer?.phoneNumber}
          label="Phone number"
          margin="normal"
        />
        <TextField
          required
          fullWidth
          name="address"
          autoComplete="off"
          defaultValue={customer?.address}
          label="Address"
          margin="normal"
        />
        <FormControl required fullWidth margin="normal">
          <InputLabel id="select-status-label" htmlFor="select-status">
            Status
          </InputLabel>
          <Select
            labelId="select-status-label"
            defaultValue={customer?.status || ''}
            label="Status"
            inputProps={{ id: 'select-status', name: 'status' }}
          >
            {Object.entries(CustomerStatusEnum).map(([key, value]) => (
              <MenuItem key={value} value={value}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          multiline
          fullWidth
          name="note"
          autoComplete="off"
          defaultValue={customer?.note}
          label="Note"
          margin="normal"
        />
        <SubmitButton label={customer ? 'Update' : 'Create'} />
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
