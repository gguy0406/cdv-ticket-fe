'use client';

import { BaseSyntheticEvent, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FiMoreVertical } from 'react-icons/fi';

import { Customer } from '@/interfaces/customer';

import { deleteCustomer } from '../_actions';
import Link from 'next/link';

export default function CustomerAction({ customer }: { customer: Customer }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteCustomerDialogOpen, setDeleteCustomerDialogOpen] = useState(false);
  const isMenuOpen = Boolean(anchorEl);

  return (
    <>
      <IconButton
        id={`basic-button-${customer.id}`}
        aria-label="more-action"
        aria-haspopup="true"
        size="small"
        aria-controls={isMenuOpen ? `basic-menu-${customer.id}` : undefined}
        aria-expanded={isMenuOpen ? 'true' : undefined}
        onClick={(event: BaseSyntheticEvent) => setAnchorEl(event.currentTarget)}
      >
        <FiMoreVertical />
      </IconButton>
      <Menu
        id={`basic-menu-${customer.id}`}
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{ 'aria-labelledby': `basic-button-${customer.id}` }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link href={`/customers/${customer.id}/edit`}>
          <MenuItem>Edit</MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setDeleteCustomerDialogOpen(true);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      <Dialog open={deleteCustomerDialogOpen} onClose={() => setDeleteCustomerDialogOpen(false)}>
        <DialogTitle>Delete customer confirmation</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleteCustomerDialogOpen(false);
              deleteCustomer(customer.id);
            }}
          >
            Ok
          </Button>
          <Button autoFocus onClick={() => setDeleteCustomerDialogOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
