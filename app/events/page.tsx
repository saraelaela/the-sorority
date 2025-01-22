'use server';
import { cookies } from 'next/headers';
import React from 'react';
import { getEventsInsecure } from '../../database/events';
import { getValidSessionToken } from '../../database/sessions';
import { getUser } from '../../database/users';
import Events from './components/Events';

type Props = {
  searchParams: Promise<{
    returnTo?: string | string[];
  }>;
};

export default async function EventsPage(props: Props) {
  const events = await getEventsInsecure();
  // 1) check if sessionToken exists
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  //2. Check if sessionToken cookie is still valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionToken(sessionTokenCookie?.value));

  // 3. if SessionToken cookie is Valid, redirect to home
  // if (session) {
  //   redirect(getSafeReturnToPath(returnTo) || '/');
  // }

  const user = session ? await getUser(session.token) : null;

  //1)  sessiontoken holen 2) Userdaten holen und als Props weitergeben, schauen, ob ID mitgeschickt wird

  return (
    <div>
      <Events session={session} events={events} user={user} />
    </div>
  );
}
