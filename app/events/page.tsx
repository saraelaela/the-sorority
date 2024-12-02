'use server';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import { getEventInsecure, getEventsInsecure } from '../../database/events';
import { getValidSessionToken } from '../../database/sessions';
import {
  getUser,
  getUserInsecure,
  getUsersInsecure,
  getUserWithPasswordHashInsecure,
} from '../../database/users';
import { userSchema } from '../../migrations/00000-createTableUsers';
import type { Session } from '../../migrations/00004-sessions';
import { getSafeReturnToPath } from '../../util/validation';
import Footer from '../components/Footer';
import DisplayEvents from './components/DisplayEvents';
import EventOverview from './components/EventOverview';

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
  console.log('userdata', user);
  //1)  sessiontoken holen 2) Userdaten holen und als Props weitergeben, schauen, ob ID mitgeschickt wird

  return (
    <div>
      {user ? (
        <DisplayEvents session={session} events={events} user={user} />
      ) : (
        ''
      )}

      {/* <Footer customFooter="customFooterLogin" /> */}
    </div>
  );
}
