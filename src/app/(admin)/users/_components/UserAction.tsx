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

import { deleteUser } from '@/apis/users/actions';
import { Customer } from '@/interfaces/customer';
import { User } from '@/interfaces/user';

import UserDialog from './UserDialog';

interface Props {
  user: User;
  customers: Customer[];
}

export default function UserAction({ user, customers }: Props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: BaseSyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteUser = () => {};

  return (
    <>
      <IconButton
        id={`basic-button-${user.id}`}
        aria-label="more-action"
        aria-haspopup="true"
        size="small"
        aria-controls={open ? `basic-menu-${user.id}` : undefined}
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <FiMoreVertical />
      </IconButton>
      <Menu
        id={`basic-menu-${user.id}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': `basic-button-${user.id}` }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <UserDialog user={user} customers={customers} triggerBtn={<MenuItem>Edit</MenuItem>} />
        <DialogDeleteConfirm userId={user.id} />
      </Menu>
    </>
  );
}

function DialogDeleteConfirm({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    handleClose();
    deleteUser(userId);
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen}>Delete</MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete user confirmation</DialogTitle>
        <DialogActions>
          <Button onClick={handleOk}>Ok</Button>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
