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
import { FiCalendar, FiExternalLink, FiMapPin, FiTv } from 'react-icons/fi';

import EventDetail from '@/components/feature/event-detail';
import { CDVEvent, EventStatusEnum } from '@/interfaces/event';

import ButtonApprove from './button-approve';
import ButtonSubmit from './button-submit';
import EventAction from './event-action';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import clsx from 'clsx';
import Stack from '@mui/material/Stack';

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
          <Card key={event.id} sx={{ mt: 2, width: '100%', minWidth: 0, display: 'flex' }}>
            <CardHeader
              avatar={
                <Avatar alt="event logo" src={`https://picsum.photos/id/${Math.ceil(Math.random() * 100)}/200/200`} />
              }
              action={<EventAction event={event} />}
              title={
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    setEvent(event);
                    setOpen(true);
                  }}
                >
                  {event.name}
                </Link>
              }
              subheader={
                <>
                  <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', minWidth: 0 }}>
                    <FiMapPin className="flex-shrink-0" />
                    <span className="truncate ml-1">{event.location}</span>
                  </Box>
                  <Box sx={{ mt: 0.25, display: 'flex', alignItems: 'center', minWidth: 0 }}>
                    <FiCalendar className="flex-shrink-0" />
                    <span className="truncate ml-1">{event.createdAt}</span>
                  </Box>
                  {!!event.customer && (
                    <Box sx={{ mt: 0.25, display: 'flex', alignItems: 'center', minWidth: 0 }}>
                      <FiTv className="flex-shrink-0" />
                      <span className="truncate ml-1">{event.customer?.name}</span>
                    </Box>
                  )}
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Chip
                      label={event.status}
                      size="small"
                      className={clsx({
                        'bg-yellow-300': event.status === EventStatusEnum.Pending,
                        'bg-green-300': event.status === EventStatusEnum.Approved,
                      })}
                      sx={{ mt: 1 }}
                    />
                    {!!event.type && event.type.map((type) => <Chip key={type.id} label={type.name} size="small" />)}
                  </Stack>
                </>
              }
              sx={{
                flexBasis: 400,
                flexShrink: 0,
                minWidth: 0,
                alignItems: 'start',
                '& .MuiCardHeader-content': { minWidth: 0 },
              }}
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
