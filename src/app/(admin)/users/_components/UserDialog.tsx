'use client';

import { ChangeEvent, useState } from 'react';
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
import { User, UserStatusEnum } from '@/interfaces/user';

import { submitUser } from '../_lib/actions';

interface Props {
  customers: Customer[];
}

type UserFormData = Partial<
  Pick<User, 'fullName' | 'username' | 'password' | 'status'> & { roleId: number; customerId: string }
>;

export default function UserDialog({ customers }: Props) {
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useFormState(submitUser, undefined);
  const [user, setUser] = useState<UserFormData>({
    fullName: '',
    username: '',
    password: '',
    status: UserStatusEnum.Active,
  });

  console.log(customers);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: keyof UserFormData) => {
    setUser({ ...user, [key]: event.target.value });
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        New User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <Box component="form" id="createUserForm" action={dispatch}>
            <TextField
              required
              autoFocus
              fullWidth
              name="fullName"
              autoComplete="full-name"
              label="Full Name"
              margin="normal"
              value={user.fullName}
              onChange={(event) => handleUserChange(event, 'fullName')}
            />
            <TextField
              required
              fullWidth
              name="username"
              autoComplete="username"
              label="Username"
              margin="normal"
              value={user.username}
              onChange={(event) => handleUserChange(event, 'username')}
            />
            <TextField
              required
              fullWidth
              name="password"
              type="password"
              label="Password"
              margin="normal"
              value={user.password}
              onChange={(event) => handleUserChange(event, 'password')}
            />
            <FormControl required fullWidth margin="normal">
              <InputLabel id="select-status-label">Status</InputLabel>
              <Select
                labelId="select-status-label"
                id="select-status"
                value={user.status}
                label="Status"
                onChange={(event) => setUser({ ...user, status: event.target.value as UserStatusEnum })}
              >
                <MenuItem value={UserStatusEnum.Active}>Active</MenuItem>
                <MenuItem value={UserStatusEnum.Inactive}>Inactive</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit">Create</Button>
          </Box>
          {typeof state === 'string' && <div>{state}</div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
