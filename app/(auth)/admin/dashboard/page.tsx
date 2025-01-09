import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { type Event, getEventsInsecure } from '../../../../database/events';
import { getValidSessionToken } from '../../../../database/sessions';
import { getUser, getUsersInsecure } from '../../../../database/users';
import { prisma } from '../../../../src/lib/db';
import eventStyles from '../../../events/page.module.scss';
import AdminForm from './(components)/AdminForm';
import DeleteEvents from './(components)/DeleteEvents';
import EditEvents from './(components)/EditEvents';
import styles from './AdminPage.module.scss';

export const metadata = {
  title: 'Admin page',
  description: 'Solidarity Admin',
};

export default async function AdminPage() {
  // const events = await getEventsInsecure();
  const events = await prisma.event.findMany();
  const usersTest = await getUsersInsecure();
  //1. Cookie exist
  console.log('usersTest', usersTest);
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  //2. sessionToken still valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionToken(sessionTokenCookie.value));

  //3.
  if (!session) {
    redirect('/login?returnTo=/admin/dashboard');
  }

  const user = sessionTokenCookie && (await getUser(sessionTokenCookie?.value));
  return (
    <div className={styles.main}>
      <div className={styles.eventSummary}>
        <div className={styles.info}>
          <h3 className={styles.h3}>Dashboard</h3>
        </div>
        {events.map((event) => {
          const eventId = event.id;
          if (!event.id) {
            return null; // Safeguard against invalid data
          }
          return (
            <div key={`events-${event.id}`} className={styles.eventParcel}>
              <div>
                <div className={eventStyles.eventDate}>
                  {new Date(event.eventDate).toLocaleDateString()}
                </div>
                <div className={eventStyles.eventDetails}>
                  <div className={eventStyles.eventTags}>
                    <div>event Time</div>
                    <div>{event.eventLocation}</div>
                  </div>
                  <h4 className={eventStyles.h4}>{event.eventTitle}</h4>
                </div>
                {/* </div> */}
              </div>
              <div className={styles.editSection}>
                <EditEvents />
                <DeleteEvents eventId={eventId} />
              </div>
            </div>
          );
        })}
      </div>
      {/* <DisplayEvents events={events} /> */}
      <div className={styles.eventCreation}>
        <AdminForm />
      </div>
    </div>
  );
}
