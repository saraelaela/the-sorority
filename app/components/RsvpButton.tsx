import { NextResponse } from 'next/server';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import buttonStyles from '../(auth)/admin/dashboard/(components)/Buttons.module.scss';
import type { RsvpResponseBody } from '../(auth)/api/rsvp/route';
import { getAllRsvpInsecure } from '../../database/rsvp';
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

  const notify = () => toast('RSVP Successful! See you soon (.❛ ᴗ ❛.)');

  // Log initialRsvpStatus when it changes
  useEffect(() => {
    console.log('Updated RsvpStatus:', rsvpStatus);
  }, [rsvpStatus]);

  return (
    <div className={styles.buttonContainer}>
      <Toaster position="center" reverseOrder={false} />
      <button
        className={buttonStyles.logoutButton}
        onClick={async () => {
          notify();
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

          // Parse response
          const data: RsvpResponseBody = await response.json();

          // Check for errors in response
          if ('errors' in data) {
            setErrors(data.errors);
          }
          //3. Check if user exists
          // const allRsvp = await getAllRsvpInsecure();
          // if (allRsvp) {
          //   return NextResponse.json(
          //     {
          //       errors: [
          //         {
          //           message: 'You already RSVPd',
          //         },
          //       ],
          //     },
          //     {
          //       status: 400,
          //     },
          //   );
          // }
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
              stroke-width="4"
            />
          </svg>
        </div>
        <div className={buttonStyles.logoutButtonItem}>{props.value}</div>
      </button>
    </div>
  );
}
