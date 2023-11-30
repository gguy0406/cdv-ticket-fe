import Image from 'next/image';

import { CDVEvent } from '@/interfaces/event';

export default function EventDetail({ event }: { event: CDVEvent }) {
  return (
    <>
      <Image src="https://picsum.photos/1600/300" width={1600} height={300} alt="Event banner" />
      <div>name {event.name}</div>
      <div>location {event.location}</div>
      <div>description {event.description}</div>
    </>
  );
}
