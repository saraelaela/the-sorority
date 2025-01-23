'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Event } from '../../../../../database/events';
import type { EventResponseBodyDelete } from '../../../api/events/route';
import eventStyles from '../AdminPage.module.scss';
import styles from '../AdminPage.module.scss';
import AdminEventForm from './AdminForm';

export const metadata = {
  title: 'Admin page',
  description: 'Solidarity Admin',
};

type Props = {
  events: Event[];
};
export default function EventComponent(props: Props) {
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const router = useRouter();
  return (
    <div className={styles.main}>
      <div className={styles.eventSummary}>
        <div className={styles.info}>
          <h3 className={styles.h3}>Dashboard</h3>
        </div>
        {props.events.map((event) => {
          const eventId = event.id;
          if (!event.id) {
            return null;
          }
          return (
            <div key={`events-${event.id}`} className={styles.eventParcel}>
              <div>
                <div className={eventStyles.eventDate}>
                  {new Date(event.eventDate).toLocaleDateString('de-DE')}
                </div>
                <div className={eventStyles.eventDetails}>
                  <div className={eventStyles.eventTags}>
                    <div>event Time</div>
                    <div>{event.eventLocation}</div>
                  </div>
                  <h4 className={eventStyles.h4}>{event.eventTitle}</h4>
                </div>
              </div>
              <div className={styles.editSection}>
                <button
                  className={styles.editButton}
                  onClick={() => {
                    setShowForm(true);
                    setSelectedEvent(event);
                  }}
                >
                  <div className={styles.icon}>✎</div>

                  <div>Edit Event</div>
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={async () => {
                    const response = await fetch(`/api/events`, {
                      method: 'DELETE',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      //1. von frontend ins backend { id: props.eventId } // props.eventId ist eine Variable
                      body: JSON.stringify({ id: eventId }),
                    });

                    setErrorMessage('');

                    if (!response.ok) {
                      let newErrorMessage = 'Error deleting event';

                      const responseBody: EventResponseBodyDelete =
                        await response.json();

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
                  <div> ✕ </div>
                  <div> Delete Event</div>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.eventCreation}>
        <AdminEventForm
          selectedEvent={selectedEvent}
          events={props.events}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      </div>
    </div>
  );
}
