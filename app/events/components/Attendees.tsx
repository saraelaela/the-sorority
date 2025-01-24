import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import type { Event } from '../../../database/events';
import type { EventRsvpOverview } from '../../../migrations/00006-rsvp';
import styles from '../page.module.scss';

type Props = {
  event?: Event;
};

export default function Attendees(props: Props) {
  const [attendees, setAttendees] = useState<EventRsvpOverview[]>([]);
  useEffect(() => {
    async function fetchAttendees() {
      console.log('Starting fetch with event ID:', props.event?.id);
      if (!props.event?.id) return;
      console.log('Making fetch request...');
      const response = await fetch(`/api/rsvp?eventId=${props.event?.id}`);
      console.log('checking out response:', response);
      const data = await response.json();

      console.log('datafetch', data);

      const { eventRsvps } = data;
      setAttendees(eventRsvps);
    }
    fetchAttendees();
  }, [props.event?.id]);

  useEffect(() => {
    console.log('attendees updated:', attendees);
  }, [attendees]);

  return (
    <div className={styles.attendeeContainer}>
      {attendees.length > 0 ? (
        <>
          <div>Meet XXX & many others at this Event!</div>
          <div className={styles.attendeeGallery}>
            {attendees.map((attendee, index: number) => (
              <Image
                key={`attendee-${attendee.id}`}
                className={styles.attendeeImage}
                src={attendee.profilePicture || '/images/image-placeholder.png'}
                style={{
                  width: '7%',
                  height: 'auto',
                  borderRadius: '30px',
                  zIndex: attendees!.length - index,
                }}
                width={50}
                height={50}
                alt="Mitglieder des Sorority-Vorstands"
              />
            ))}
          </div>
        </>
      ) : (
        <div>Be the first to join this event!</div>
      )}
    </div>
  );
}
