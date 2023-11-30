'use client';

import Button from '@mui/material/Button';

import { submitEvent } from '@/actions/event';
import { CDVEvent } from '@/interfaces/event';

export default function ButtonSubmit({ event }: { event: CDVEvent }) {
  return (
    <Button disableElevation variant="contained" onClick={() => submitEvent(event.id)}>
      Submit
    </Button>
  );
}
