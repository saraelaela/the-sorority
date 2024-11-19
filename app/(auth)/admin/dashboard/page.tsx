import { v2 as cloudinary } from 'cloudinary';
import { cookies } from 'next/headers';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';
import { getEventsInsecure } from '../../../../database/events';
import { getValidSessionToken } from '../../../../database/sessions';
import { getUser, getUsersInsecure } from '../../../../database/users';
import DisplayEvents from '../../../events/components/DisplayEvents';
import eventStyles from '../../../events/page.module.scss';
import AdminForm from './(components)/AdminForm';
import DeleteEvents from './(components)/DeleteEvents';
import styles from './AdminPage.module.scss';

// import AdminForm from './AdminForm';
type Props = {
  // events: any;
  eventId: number;
  searchParams: Promise<{
    returnTo?: string | string[];
  }>;
};

// type DeleteEventsProps = {
//   eventId: number;
// };

export const metadata = {
  title: 'Admin page',
  description: 'Solidarity Admin',
};

export default async function AdminPage(props: Props) {
  const events = await getEventsInsecure();
  console.log('the events should be: ', events);

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
      <div>
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
              <DeleteEvents eventId={eventId} />
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
