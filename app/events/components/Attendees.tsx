import Image from 'next/image';
import React from 'react';
import type { Event } from '../../../database/events';
import type { User } from '../../../database/users';
import type { EventRsvpOverview } from '../../../migrations/00006-rsvp';
import styles from '../page.module.scss';

type Props = {
  event?: Event;
  attendees: EventRsvpOverview[];
  user: User | null;
};

export default function Attendees(props: Props) {
  const getAttendanceMessage = () => {
    // Single attendee (not current user)
    if (
      props.attendees.length === 1 &&
      props.attendees[0]?.userId !== props.user?.id
    ) {
      return `${props.attendees[0]?.firstName} is also attending this Event.`;
    }

    // Multiple attendees
    if (props.attendees.length > 1) {
      const otherAttendees = props.attendees.filter(
        (attendee) => attendee.userId !== props.user?.id,
      );

      if (otherAttendees.length === 0) {
        return null;
      }

      // only one other person (total of 2 people including you)
      if (otherAttendees.length === 1) {
        return `${otherAttendees[0]?.firstName} is also attending this Event.`;
      }

      // at least 2 others
      if (otherAttendees.length >= 2) {
        return `Meet ${otherAttendees[0]?.firstName} and ${
          otherAttendees.length - 1
        } other(s) at this Event!`;
      }
    }

    return null;
  };

  const message = getAttendanceMessage();

  return message ? (
    <div className={styles.attendeeContainer}>
      <div>{message}</div>
      <div className={styles.attendeeGallery}>
        {props.attendees.map((attendee, index) => (
          <Image
            key={`attendee-${attendee.id}`}
            className={styles.attendeeImage}
            src={attendee.profilePicture || '/images/image-placeholder.png'}
            style={{
              width: '7%',
              height: 'auto',
              borderRadius: '30px',
              zIndex: props.attendees.length - index,
            }}
            width={50}
            height={50}
            alt={`Profile picture of ${attendee.firstName}`}
          />
        ))}
      </div>
    </div>
  ) : null;
}
