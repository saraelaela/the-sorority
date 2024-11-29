import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { type Event, getEventsInsecure } from '../../../../database/events';
import { getValidSessionToken } from '../../../../database/sessions';
import { getUser, getUsersInsecure } from '../../../../database/users';
import eventStyles from '../../../events/page.module.scss';
import AdminForm from './(components)/AdminForm';
import DeleteEvents from './(components)/DeleteEvents';
import EditEvents from './(components)/EditEvents';
import styles from './AdminPage.module.scss';

// import AdminForm from './AdminForm';
type Props = {
  events: Event[];
  eventId: number;
  searchParams: {
    returnTo?: string | string[];
  };
};

export const metadata = {
  title: 'Admin page',
  description: 'Solidarity Admin',
};

export default async function AdminPage(props: Props) {
  const events = await getEventsInsecure();
  const usersTest = await getUsersInsecure();
  console.log('usersData', usersTest);
  //1. Cookie exist
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
          {/* <p className={styles.p}>
            {' '}
            Welcome to your Dashboard! Please click to Edit or Delete an Event.
            The events are sorted by newest Date.
          </p> */}
        </div>
        {events.map((event) => {
          const eventId = event.id;
          return (
            <div className={styles.eventParcel}>
              <div key={`events-${event.id}`}>
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
