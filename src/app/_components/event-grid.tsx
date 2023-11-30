import { CDVEvent } from '@/interfaces/event';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';

export default function EventGrid({ events }: { events: CDVEvent[] }) {
  return (
    <Container sx={{ py: 4 }} maxWidth="lg">
      <Grid container spacing={4}>
        {events.map((event) => (
          <Grid item key={event.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia component="div" sx={{ pt: '56.25%' }} image="https://source.unsplash.com/random?wallpapers" />
              <CardContent sx={{ flexGrow: 1 }}>
                <Link href={`/event/${event.id}`} className="truncate">
                  {event.name}
                  <FiExternalLink className="inline ml-2" />
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
    </Container>
  );
}
