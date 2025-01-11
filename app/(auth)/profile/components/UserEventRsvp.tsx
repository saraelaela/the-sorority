import { type User } from '../../../../database/users';
import type { Rsvp } from '../../../../migrations/00006-rsvp';
import { prisma } from '../../../../src/lib/db';
import styles from './UserEventRsvp.module.scss';
import UserProfile from './UserProfile';

type Props = {
  userRsvp: Rsvp[];
  user: User;
  firstName: string;
};

export default async function UserEventRsvp(props: Props) {
  console.log('userRSVP:', props.userRsvp);
  console.log('props user:', props.user);
  const rsvps = await prisma.rsvp.findMany({
    where: {
      eventId: id, // or whatever your filter is
    },
    include: {
      Event: true, // This includes all Event fields
    },
  });
  return (
    <div className={styles.eventWrapper}>
      <div className={styles.eventContainer}>
        <h1>Your Profile</h1>
        <div className={styles.userOverview}>
          <UserProfile firstName={props.firstName} user={props.user} />
          <div className={styles.eventOverview}>
            <h3 className={styles.h3}>Your upcoming Events </h3>

            {Array.isArray(props.userRsvp) && props.userRsvp.length > 0 ? (
              props.userRsvp.map((rsvp) => {
                return (
                  <div
                    key={`events-${rsvp.id}`}
                    className={styles.eventListItem}
                  >
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
                );
              })
            ) : (
              <div className={styles.noEvent}>No events yet.</div>
            )}
          </div>
        </div>
      </div>
      {/* <div>{props.userRsvp.eventId}</div> */}
    </div>
  );
}
