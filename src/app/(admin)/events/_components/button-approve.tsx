'use client';

import Button from '@mui/material/Button';

import { approveEvent } from '@/actions/event';
import { CDVEvent } from '@/interfaces/event';

export default function ButtonApprove({ event }: { event: CDVEvent }) {
  return (
    <Button disableElevation variant="contained" onClick={() => approveEvent(event.id)}>
      Approve
    </Button>
  );
}
