'use client';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';

import EventDetail from '@/components/feature/event-detail';
import { CDVEvent, EventStatusEnum } from '@/interfaces/event';

import ButtonApprove from './button-approve';
import ButtonSubmit from './button-submit';
import EventAction from './event-action';

interface Props {
  events: CDVEvent[];
}

export default function EventList({ events }: Props) {
  const [event, setEvent] = useState<CDVEvent>();
  const [open, setOpen] = useState(false);

  if (!events.length) return <p>No event data</p>;

  return (
    <>
      <Box sx={{ flexGrow: 1, alignSelf: 'stretch', paddingX: 2, overflow: 'auto' }}>
        {events.map((event) => (
          <Card key={event.id} sx={{ mt: 2, width: '100%', display: 'flex' }}>
            <CardHeader
              avatar={<Avatar alt="event logo" src="https://picsum.photos/200/200" />}
              action={<EventAction event={event} />}
              title={
                <Button
                  size="small"
                  className="truncate"
                  endIcon={<FiExternalLink />}
                  onClick={() => {
                    setEvent(event);
                    setOpen(true);
                  }}
                >
                  {event.name}
                </Button>
              }
              subheader={event.createdAt}
              sx={{ width: 400 }}
            />
            <Divider orientation="vertical" flexItem />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {event.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Dialog fullWidth maxWidth="xl" open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{event?.name}</span>
          {(function () {
            switch (event?.status) {
              case EventStatusEnum.Draft:
                return <ButtonSubmit event={event}></ButtonSubmit>;
              case EventStatusEnum.Pending:
                return <ButtonApprove event={event}></ButtonApprove>;
              case EventStatusEnum.Approved:
              default:
                return <></>;
            }
          })()}
        </DialogTitle>
        <DialogContent>{!!event && <EventDetail event={event} />}</DialogContent>
      </Dialog>
    </>
  );
}
