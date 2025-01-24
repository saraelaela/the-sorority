import React, { useEffect, useState } from 'react';
import type { Event } from '../../../database/events';
import { getUserRsvp } from '../../../database/rsvp';
import type { UserRsvp } from '../../../migrations/00006-rsvp';
import styles from '../page.module.scss';

type Props = {
  userRsvp?: UserRsvp[];
  event?: Event;
};

export default function Attendees(props: Props) {
  const [attendees, setAttendees] = useState<UserRsvp[]>([]);
  useEffect(() => {
    async function fetchAttendees() {
      const response = await fetch(`/api/attendees?eventId=${props.event?.id}`);
      const data = await response.json();
      console.log('datafetch', data);
    }
    fetchAttendees();
  }, [props.event?.id]);

  return (
    <div className={styles.attendeeContainer}>
      {attendees.length > 0 ? (
        <>
          <div>Meet XXX & many others at this Event!</div>
          <div className={styles.attendeeGallery}>
            {attendees.map((attendee, index) => (
              <div
                key={attendee.id}
                style={{ zIndex: attendees.length - index }}
              >
                {/* Your attendee display logic */}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>Be the first to join this event!</div>
      )}
    </div>
  );
}
