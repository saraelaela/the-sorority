'use client';
import React, { useState } from 'react';
import type { Event } from '../../../database/events';
import type { User } from '../../../database/users';
import type { Session } from '../../../migrations/00004-sessions';
import styles from '../page.module.scss';
import EventOverview from './EventOverview';

type Props = {
  events: Event[];
  user?: User | null;
  session?: Session;
};

export default function DisplayEvents(props: Props) {
  const [selectedEvent, setSelectedEvent] = useState(props.events[0]);

  return (
    <div className={styles.eventWrapper}>
      <div className={styles.eventsList}>
        <h2 className={styles.h2}>Events</h2>
        {props.events.map((event) => {
          return (
            <div key={`events-${event.id}`}>
              <div className={styles.eventContainer}>
                <button
                  className={styles.eventButton}
                  onClick={() => {
                    setSelectedEvent(event);
                  }}
                >
                  <div className={styles.eventDate}>
                    {new Date(event.eventDate).toLocaleDateString('de-DE')}
                  </div>
                  <div className={styles.eventDetails}>
                    <div className={styles.eventTags}>
                      <div>10.30 AM</div>
                      <div>{event.eventLocation}</div>
                    </div>
                    <h4 className={styles.h4}>{event.eventTitle}</h4>
                  </div>
                </button>
              </div>
            </div>
          );
        })}

        {/* <Footer customFooter="customFooterLogin" /> */}
      </div>
      <div>
        <EventOverview
          session={props.session}
          event={selectedEvent}
          user={props.user ?? null}
        />
      </div>
    </div>
  );
}
