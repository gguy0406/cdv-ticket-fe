import Image from 'next/image';
import Box from '@mui/material/Box';
import { FiCalendar, FiInfo, FiMapPin } from 'react-icons/fi';
import { CDVEvent } from '@/interfaces/event';

export default function EventDetail({ event }: { event: CDVEvent }) {
  return (
    <>
      <Image src="https://picsum.photos/1600/300" width={1600} height={300} alt="Event banner" />
      <div style={{ fontWeight: 'bold', fontSize: 20 }}>{event.name.toUpperCase()}</div>
      <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', minWidth: 0, fontWeight: 'bold' }}>
        <FiCalendar className="flex-shrink-0" />
        <span className="truncate ml-1">{new Date(event.createdAt).toDateString()}</span>
      </Box>
      <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', minWidth: 0, fontWeight: 'bold' }}>
        <FiMapPin className="flex-shrink-0" />
        <span className="truncate ml-1">{event.location}</span>
      </Box>
      <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', minWidth: 0, fontWeight: 'bold' }}>
        <FiInfo className="flex-shrink-0" />
        <span className="truncate ml-1">Information</span>
      </Box>
      <div>{event.description}</div>
    </>
  );
}
