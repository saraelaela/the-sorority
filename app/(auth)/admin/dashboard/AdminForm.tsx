'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ErrorMessage from '../../../(errormessage)/ErrorMessage';
import styles from './AdminForm.module.scss';

type Props = { returnTo?: string | string[] };

export default function AdminEventForm(props: Props) {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [hostedBy, setHostedBy] = useState('');
  const [eventImage, setEventImage] = useState('');
  const [eventCosts, setEventCosts] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  // Function to handle form submission and API call
  async function handleEventCreation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventTitle,
        eventDescription,
        eventLocation,
        eventDate,
        hostedBy,
        eventImage,
        eventCosts: parseFloat(eventCosts),
        createdBy,
      }),
    });

    const data = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(`/admin/dashboard`);
    router.refresh();
  }

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h3 className={styles.h3}>Create a New Event</h3>

          {/* form */}
          <form onSubmit={async (event) => await handleEventCreation(event)}>
            <label className={styles.label}>
              Event Title
              <input
                className={styles.input}
                type="text"
                value={eventTitle}
                onChange={(event) => setEventTitle(event.currentTarget.value)}
              />
            </label>

            <label className={styles.label}>
              Event Description
              <textarea
                className={styles.input}
                value={eventDescription}
                onChange={(event) =>
                  setEventDescription(event.currentTarget.value)
                }
              />
            </label>

            <label className={styles.label}>
              Event Location
              <input
                className={styles.input}
                type="text"
                value={eventLocation}
                onChange={(event) =>
                  setEventLocation(event.currentTarget.value)
                }
              />
            </label>

            <label className={styles.label}>
              Event Date
              <input
                className={styles.input}
                type="date"
                value={eventDate}
                onChange={(event) => setEventDate(event.currentTarget.value)}
              />
            </label>

            <label className={styles.label}>
              Hosted By
              <input
                className={styles.input}
                type="text"
                value={hostedBy}
                onChange={(event) => setHostedBy(event.currentTarget.value)}
              />
            </label>

            <label className={styles.label}>
              Event Image URL
              <input
                className={styles.input}
                value={eventImage}
                onChange={(event) => setEventImage(event.currentTarget.value)}
              />
            </label>

            <label className={styles.label}>
              Event Costs
              <input
                className={styles.input}
                value={eventCosts}
                onChange={(event) => setEventCosts(event.currentTarget.value)}
              />
            </label>

            <label className={styles.label}>
              Created By
              <input
                className={styles.input}
                type="text"
                value={createdBy}
                onChange={(event) => setCreatedBy(event.currentTarget.value)}
              />
            </label>

            <button>Create Event</button>

            {errors.map((error) => (
              <div className="error" key={`error-${error.message}`}>
                <ErrorMessage>{error.message}</ErrorMessage>
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
}
