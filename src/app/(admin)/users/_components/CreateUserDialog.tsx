'use client';

import Button from '@mui/material/Button';
import { useState } from 'react';

import { Customer } from '@/interfaces/customer';
import { Role } from '@/interfaces/user';

import UserDialog from './UserDialog';

interface Props {
  customers: Customer[];
  roles: Role[];
}

export default function CreateUserDialog({ customers, roles }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        New User
      </Button>
      <UserDialog open={open} customers={customers} roles={roles} handleClose={() => setOpen(false)} />
    </>
  );
}
