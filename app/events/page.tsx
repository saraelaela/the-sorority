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
  const events = await getEventsInsecure().catch((error) => {
    console.error('Error in EventsPage:', error);
    return [];
  });

  const sessionTokenCookie = (await cookies()).get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionToken(sessionTokenCookie?.value));

  const user = session ? await getUser(session.token) : null;

  return (
    <div>
      <Events session={session} events={events} user={user} />
    </div>
  );
}
