'use client';
import { useRouter } from 'next/navigation';
import type { Props } from 'next/script';
import React, { useState } from 'react';
import type { EventResponseBodyDelete } from '../../../api/events/route';

type Props = {
  events: Event[];
  eventId: number;
};

export default function DeleteEvents(props: Props) {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return (
    <>
      <button
        onClick={async () => {
          const response = await fetch(`/api/events`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: props.eventId }),
          });

          setErrorMessage('');

          if (!response.ok) {
            let newErrorMessage = 'Error deleting event';

            const responseBody: EventResponseBodyDelete = await response.json();

            if ('error' in responseBody) {
              newErrorMessage = responseBody.error;
            }

            // TODO: Use toast instead of showing
            // this below creation / update form
            setErrorMessage(newErrorMessage);
            return;
          }

          router.refresh();

          // Reset form states if deleting an
          // event after editing it
          // resetFormStates();
        }}
      >
        Delete
      </button>
    </>
  );
}
