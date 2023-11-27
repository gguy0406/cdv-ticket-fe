import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { CDVEvent, EventStatusEnum } from '@/interfaces/event';
import ButtonSubmit from './ButtonSubmit';
import ButtonApprove from './ButtonApprove';

interface Props {
  events: CDVEvent[];
}

export default function EventList({ events }: Props) {
  if (!events.length) return <p>No customer data</p>;

  return (
    <Box sx={{ flexGrow: 1, alignSelf: 'stretch', paddingX: 2, overflow: 'auto' }}>
      {events.map((event) => (
        <Card key={event.id} sx={{ mt: 2, width: '100%' }}>
          <CardHeader
            avatar={<Avatar aria-label="event logo">{event.customer?.name || '--'}</Avatar>}
            action={(function () {
              switch (event.status) {
                case EventStatusEnum.Draft:
                  return <ButtonSubmit event={event}></ButtonSubmit>;
                case EventStatusEnum.Pending:
                  return <ButtonApprove event={event}></ButtonApprove>;
                case EventStatusEnum.Approved:
                default:
                  return <></>;
              }
            })()}
            title={event.name}
            subheader={event.createdAt}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {event.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
