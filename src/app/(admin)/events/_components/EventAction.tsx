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

import { CDVEvent } from '@/interfaces/event';

import { deleteEvent } from '../_actions';
import Link from 'next/link';

export default function EventAction({ event }: { event: CDVEvent }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteEventDialogOpen, setDeleteEventDialogOpen] = useState(false);
  const isMenuOpen = Boolean(anchorEl);

  return (
    <>
      <IconButton
        id={`basic-button-${event.id}`}
        aria-label="more-action"
        aria-haspopup="true"
        size="small"
        aria-controls={isMenuOpen ? `basic-menu-${event.id}` : undefined}
        aria-expanded={isMenuOpen ? 'true' : undefined}
        onClick={(event: BaseSyntheticEvent) => setAnchorEl(event.currentTarget)}
      >
        <FiMoreVertical />
      </IconButton>
      <Menu
        id={`basic-menu-${event.id}`}
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{ 'aria-labelledby': `basic-button-${event.id}` }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link href={`/events/${event.id}/edit`}>
          <MenuItem>Edit</MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setDeleteEventDialogOpen(true);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      <Dialog open={deleteEventDialogOpen} onClose={() => setDeleteEventDialogOpen(false)}>
        <DialogTitle>Delete event confirmation</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleteEventDialogOpen(false);
              deleteEvent(event.id);
            }}
          >
            Ok
          </Button>
          <Button autoFocus onClick={() => setDeleteEventDialogOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
