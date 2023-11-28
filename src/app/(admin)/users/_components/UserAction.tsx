'use client';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BaseSyntheticEvent, useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';

import { Customer } from '@/interfaces/customer';
import { Role, User } from '@/interfaces/user';

import { deleteUser } from '../_actions';

import UserDialog from './UserDialog';

interface Props {
  hasSystemPermission: boolean;
  user: User;
  customers: Customer[];
  roles: Role[];
}

export default function UserAction({ hasSystemPermission, user, customers, roles }: Props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [updateUserDialogOpen, setUpdateUserDialogOpen] = useState(false);
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false);
  const isMenuOpen = Boolean(anchorEl);

  return (
    <>
      <IconButton
        id={`basic-button-${user.id}`}
        aria-label="more-action"
        aria-haspopup="true"
        size="small"
        aria-controls={isMenuOpen ? `basic-menu-${user.id}` : undefined}
        aria-expanded={isMenuOpen ? 'true' : undefined}
        onClick={(event: BaseSyntheticEvent) => setAnchorEl(event.currentTarget)}
      >
        <FiMoreVertical />
      </IconButton>
      <Menu
        id={`basic-menu-${user.id}`}
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{ 'aria-labelledby': `basic-button-${user.id}` }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setUpdateUserDialogOpen(true);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setDeleteUserDialogOpen(true);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      <UserDialog
        hasSystemPermission={hasSystemPermission}
        open={updateUserDialogOpen}
        user={user}
        customers={customers}
        roles={roles}
        handleClose={() => setUpdateUserDialogOpen(false)}
      />
      <Dialog open={deleteUserDialogOpen} onClose={() => setDeleteUserDialogOpen(false)}>
        <DialogTitle>Delete user confirmation</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleteUserDialogOpen(false);
              deleteUser(user.id);
            }}
          >
            Ok
          </Button>
          <Button autoFocus onClick={() => setDeleteUserDialogOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
