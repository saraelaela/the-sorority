'use server';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'; // Remove useState since this is a Server Component
import { prisma } from '../../src/lib/db';
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
  // Get all events
  const events = await prisma.event.findMany({
    include: {
      User: true, // Include user data if needed
      rsvps: true, // Include RSVPs if needed
    },
  });

  // Get session token from cookies
  const sessionTokenCookie = (await cookies()).get('sessionToken');
  // const sessionTokenCookie = cookies().get('sessionToken');

  // Check if session is valid
  const session = sessionTokenCookie
    ? await prisma.session.findUnique({
        where: {
          token: sessionTokenCookie.value,
        },
        include: {
          User: true, // Include user data with the session
        },
      })
    : null;

  // Get user if session exists
  const user = session?.User || null;

  // Optional: Check if session is expired
  if (session && session.expiryTimestamp < new Date()) {
    // Delete expired session
    await prisma.session.delete({
      where: {
        token: session.token,
      },
    });
    return redirect('/login'); // or wherever you want to redirect
  }

  return (
    <div>
      <DisplayEvents session={session} events={events} user={user} />
      {/* {user ? (
        <DisplayEvents session={session} events={events} user={user} />
      ) : (

      )} */}

      {/* <Footer customFooter="customFooterLogin" /> */}
    </div>
  );
}
