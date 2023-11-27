'use client';

import Button from '@mui/material/Button';

import { CDVEvent } from '@/interfaces/event';

import { submitEvent } from '../_actions';

export default function ButtonSubmit({ event }: { event: CDVEvent }) {
  return (
    <Button disableElevation variant="contained" onClick={() => submitEvent(event.id)}>
      Submit
    </Button>
  );
}
