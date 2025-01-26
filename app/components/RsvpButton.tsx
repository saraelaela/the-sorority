import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import buttonStyles from '../(auth)/admin/dashboard/(components)/Buttons.module.scss';
import type { RsvpResponseBody } from '../(auth)/api/rsvp/route';
import type { EventRsvpOverview } from '../../migrations/00006-rsvp';
import styles from '../page.module.scss';

type Props = {
  userId?: number;
  eventDetails?: number;
  value: string;
  setRsvpStatus: (rsvps: boolean) => void;
};

export default function RsvpButton(props: Props) {
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const eventId = props.eventDetails;
  const userId = props.userId;
  const router = useRouter();

  const notify = () => toast('RSVP Successful! See you soon (.❛ ᴗ ❛.)');
  const createdAt = new Date().toISOString();

  return (
    <div className={styles.buttonContainer}>
      <Toaster position="bottom-center" reverseOrder={false} />
      <button
        className={buttonStyles.logoutButton}
        disabled={!userId}
        onClick={async () => {
          notify();
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

          {
            console.log('response date format', response);
          }
          // Parse response
          const data: RsvpResponseBody = await response.json();
          {
            console.log('date format', data);
          }
          // Check for errors in response
          if ('errors' in data) {
            setErrors(data.errors);
          } else {
            setTimeout(() => {
              router.refresh();
            }, 1000);
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
