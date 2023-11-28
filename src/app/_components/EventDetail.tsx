import { CDVEvent } from '@/interfaces/event';

export default function EventDetail({ event }: { event?: CDVEvent }) {
  if (!event) return null;

  return (
    <>
      <div>name {event.name}</div>
      <div>location {event.location}</div>
      <div>description {event.description}</div>
    </>
  );
}
