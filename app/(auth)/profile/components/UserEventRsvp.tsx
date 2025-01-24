'use client';
import { useEffect, useState } from 'react';
import { type User } from '../../../../database/users';
import styles from './UserEventRsvp.module.scss';
import UserProfile from './UserProfile';

type Props = {
  user: User;
  firstName: string;
};

export default function UserEventRsvp(props: Props) {
  const [eventRsvps, setEventRsvps] = useState<boolean | null>(null);
  useEffect(() => {
    async function showEventRsvp() {
      const response = await fetch(`/api/rsvp?userId=${props.user.id}`);
      const data = await response.json();
      console.log('RSVP response:', data);
      setEventRsvps(data.allUserRsvps);
    }

    showEventRsvp();
  }, [props.user?.id]);

  console.log('userRsvp check', eventRsvps);
  return (
    <div className={styles.eventWrapper}>
      <div className={styles.eventContainer}>
        <h1>Your Profile</h1>
        <div className={styles.userOverview}>
          <UserProfile firstName={props.firstName} user={props.user} />
          <div className={styles.eventOverview}>
            <h3 className={styles.h3}>Your upcoming Events </h3>

            {Array.isArray(eventRsvps) && eventRsvps.length > 0 ? (
              eventRsvps.map((rsvp) => {
                return (
                  <div
                    className={styles.eventListContainer}
                    key={`events-${rsvp.id}`}
                  >
                    <div className={styles.eventListItem}>
                      <div className={styles.eventDate}>
                        {new Date(rsvp.eventDate).toLocaleDateString('de-DE')}
                      </div>
                      <div className={styles.eventDetails}>
                        <div className={styles.eventTags}>
                          <div>10.30 AM</div>
                          <div>{rsvp.eventLocation}</div>
                        </div>
                        <h4 className={styles.h4}>{rsvp.eventTitle}</h4>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.noEvent}>No events yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
