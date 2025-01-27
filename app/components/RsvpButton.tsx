import React, { useState } from 'react';
import buttonStyles from '../(auth)/admin/dashboard/(components)/Buttons.module.scss';
import type { RsvpResponseBody } from '../(auth)/api/rsvp/route';
import styles from '../page.module.scss';

type Props = {
  userId?: number;
  eventDetails?: number;
  value: string;
  setRsvpStatus: (rsvps: boolean) => void;
  refreshAttendees: () => void;
};

export default function RsvpButton(props: Props) {
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const eventId = props.eventDetails;
  const userId = props.userId;
  const createdAt = new Date().toISOString();

  return (
    <div className={styles.buttonContainer}>
      <button
        className={buttonStyles.logoutButton}
        disabled={!userId}
        onClick={async () => {
          console.log('event clicked');
          // Update RsvpStatus
          props.setRsvpStatus(true);

          // Fetch request
          const response = await fetch(`/api/rsvp`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              eventId,
              rsvpStatus: true,
              createdAt,
            }),
          });

          // Parse response
          const data: RsvpResponseBody = await response.json();

          // Check for errors in response
          if ('errors' in data) {
            setErrors(data.errors);
          } else {
            await props.refreshAttendees();
          }
        }}
      >
        <div className={buttonStyles.logoutButtonItem}>
          <svg
            width="10.5"
            height="9"
            viewBox="0 0 42 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 18.5H38M22.5 2L39 18.5L22.5 35"
              stroke="black"
              strokeWidth="4"
            />
          </svg>
        </div>
        <div className={buttonStyles.logoutButtonItem}>{props.value}</div>
      </button>
    </div>
  );
}
