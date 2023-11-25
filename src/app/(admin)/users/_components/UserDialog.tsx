'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
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

import { Customer } from '@/interfaces/customer';
import { Role, User, UserStatusEnum } from '@/interfaces/user';

import { createUser, updateUser } from '../_actions';

interface Props {
  open: boolean;
  roles: Role[];
  customers: Customer[];
  handleClose: () => void;
  user?: User;
}

export default function UserDialog({ open, roles, customers, user, handleClose }: Props) {
  const [state, dispatch] = useFormState(user ? updateUser : createUser, undefined);
  const nameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.statusCode === 200) handleClose();
  }, [state, handleClose]);

  useEffect(() => {
    open && setTimeout(() => nameInput.current?.focus());
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{user ? 'Update User' : 'Create New User'}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          id="createUserForm"
          action={
            user
              ? function (payload: FormData) {
                  payload.append('id', user.id);

                  return dispatch(payload);
                }
              : dispatch
          }
        >
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
              <MenuItem value={UserStatusEnum.Active}>Active</MenuItem>
              <MenuItem value={UserStatusEnum.Inactive}>Inactive</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-role-label" htmlFor="select-role">
              Role
            </InputLabel>
            <Select
              labelId="select-role-label"
              defaultValue={(user?.role?.id && roles.find((role) => role.id === user.role!.id)?.id) || ''}
              label="Status"
              inputProps={{ id: 'select-role', name: 'roleId' }}
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name || '--'}
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
                (user?.customer?.id && customers.find((customer) => customer.id === user.customer!.id)?.id) || ''
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
        <Button type="submit" form="createUserForm">
          {user ? 'Update' : 'Create'}
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
