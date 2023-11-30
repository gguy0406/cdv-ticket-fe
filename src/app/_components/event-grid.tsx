import { CDVEvent } from '@/interfaces/event';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { FiExternalLink } from 'react-icons/fi';

export default function EventGrid({ events }: { events: CDVEvent[] }) {
  return (
    <Grid container spacing={4} sx={{ padding: 4 }}>
      {events.map((event) => (
        <Grid item key={event.id} xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="div"
              sx={{ pt: '56.25%' }}
              image={`https://picsum.photos/id/${Math.ceil(Math.random() * 100)}/200/120`}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Link variant="body2" href={`/event/${event.id}`}>
                {event.name}
              </Link>
              <Typography>{event.description}</Typography>
            </CardContent>
            {/* <CardActions>
            <Button size="small">View</Button>
            <Button size="small">Edit</Button>
          </CardActions> */}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
