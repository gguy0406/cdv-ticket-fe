'use client';

import Button from '@mui/material/Button';

import { CDVEvent } from '@/interfaces/event';

import { approveEvent } from '../_actions';

export default function ButtonApprove({ event }: { event: CDVEvent }) {
  return (
    <Button disableElevation variant="contained" onClick={() => approveEvent(event.id)}>
      Approve
    </Button>
  );
}
