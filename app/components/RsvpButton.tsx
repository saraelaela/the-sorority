import React, { useEffect, useState } from 'react';
import type { RsvpResponseBody } from '../(auth)/api/rsvp/route';
import type { User } from '../../database/users';
import styles from '../page.module.css';

type Props = {
  event: Event[];
  user: User | undefined;
  userId: number;
  eventDetails: number;
};

export default function RsvpButton(props: Props) {
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [rsvpStatus, setInitialRsvpStatus] = useState(false);
  const eventId = props.eventDetails;
  const userId = props.userId;

  // Log initialRsvpStatus when it changes
  useEffect(() => {
    console.log('Updated RsvpStatus:', rsvpStatus);
  }, [rsvpStatus]);

  console.log('event id successfully passed on ', eventId);
  console.log('user id successfully passed on ', userId);

  return (
    <button
      className={styles.button}
      onClick={async () => {
        console.log('Button clicked');

        // Update RsvpStatus
        setInitialRsvpStatus(true);

        // Fetch request
        const response = await fetch(`/api/rsvp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            eventId,
            rsvpStatus,
          }),
        });

        console.log('Response status:', response.status);

        // Parse response
        const data: RsvpResponseBody = await response.json();
        console.log('RsvpResponseBody', data);

        // Check for errors in response
        if ('errors' in data) {
          setErrors(data.errors);
        }
      }}
    >
      <div>{props.icon}</div>
      <div>{props.value}</div>
    </button>
  );
}
