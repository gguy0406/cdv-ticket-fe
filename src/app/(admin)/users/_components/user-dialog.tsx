'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import { createUser, updateUser } from '@/actions/user';
import { Customer } from '@/interfaces/customer';
import { Role, User, UserStatusEnum } from '@/interfaces/user';

interface Props {
  hasSystemPermission: boolean;
  open: boolean;
  roles: Role[];
  customers: Customer[];
  handleClose: () => void;
  user?: User;
}

export default function UserDialog({ hasSystemPermission, open, roles, customers, user, handleClose }: Props) {
  const [state, dispatch] = useFormState(async function (state: HttpResponse | undefined, payload: FormData) {
    let res: HttpResponse;

    if (user) {
      payload.append('id', user.id);
      res = await updateUser(state, payload);
    } else {
      res = await createUser(state, payload);
    }

    if (res.statusCode === 200) handleClose();

    return res;
  }, undefined);

  const nameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    open && setTimeout(() => nameInput.current?.focus());
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{user ? 'Update User' : 'Create New User'}</DialogTitle>
      <DialogContent>
        <Box component="form" id="createUserForm" action={dispatch}>
          <TextField
            required
            fullWidth
            name="fullName"
            autoComplete="off"
            defaultValue={user?.fullName}
            label="Full Name"
            margin="normal"
            inputRef={nameInput}
          />
          <TextField
            required
            fullWidth
            name="username"
            autoComplete="off"
            defaultValue={user?.username}
            label="Username"
            margin="normal"
          />
          {!user && <TextField required fullWidth name="password" type="password" label="Password" margin="normal" />}
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-status-label" htmlFor="select-status">
              Status
            </InputLabel>
            <Select
              labelId="select-status-label"
              defaultValue={user?.status || ''}
              label="Status"
              inputProps={{ id: 'select-status', name: 'status' }}
            >
              {Object.entries(UserStatusEnum).map(([key, value]) => (
                <MenuItem key={value} value={value}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-role-label" htmlFor="select-role">
              Role
            </InputLabel>
            <Select
              labelId="select-role-label"
              defaultValue={user?.role?.id || ''}
              label="Role"
              inputProps={{ id: 'select-role', name: 'roleId' }}
            >
              {roles
                .filter((role) => role.name !== 'System')
                .map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {hasSystemPermission && (
            <FormControl required fullWidth margin="normal">
              <InputLabel id="select-customer-label" htmlFor="select-customer">
                Customer
              </InputLabel>
              <Select
                labelId="select-customer-label"
                defaultValue={
                  (user?.customer?.id && customers.find((customer) => customer.id === user.customer!.id)?.id) || ''
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
          <TextField
            multiline
            fullWidth
            name="note"
            autoComplete="off"
            defaultValue={user?.note}
            label="Note"
            margin="normal"
          />
        </Box>
        {state?.message && <div className="text-red-500">{state.message}</div>}
      </DialogContent>
      <DialogActions>
        <SubmitButton label={user ? 'Update' : 'Create'} />
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" form="createUserForm" aria-disabled={pending}>
      {label}
    </Button>
  );
}
