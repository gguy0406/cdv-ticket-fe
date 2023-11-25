'use client';

import { useState } from 'react';
import Button from '@mui/material/Button';

import { Customer } from '@/interfaces/customer';

import UserDialog from './UserDialog';

export default function CreateUserDialog({ customers }: { customers: Customer[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        New User
      </Button>
      <UserDialog open={open} customers={customers} handleClose={() => setOpen(false)} />
    </>
  );
}
