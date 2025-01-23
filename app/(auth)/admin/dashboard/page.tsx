import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getEventsInsecure } from '../../../../database/events';
import { getEventRsvp, getUserRsvp } from '../../../../database/rsvp';
import { getValidSessionToken } from '../../../../database/sessions';
import { getUser, getUsersInsecure } from '../../../../database/users';
import EventComponent from './(components)/EventComponent';

export const metadata = {
  title: 'Admin page',
  description: 'Solidarity Admin',
};

export default async function AdminPage() {
  const events = await getEventsInsecure();

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

  if (!user) {
    redirect('/login?returnTo=/admin/dashboard');
  }

  const rsvps = await getUserRsvp(user.id);
  console.log('rsvps check', rsvps);
  // if (!rsvps) {
  //   return 'no userRSVP';
  // }
  return <EventComponent events={events} />;
}
