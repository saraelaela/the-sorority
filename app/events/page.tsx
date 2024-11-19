'use server';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { getEventInsecure, getEventsInsecure } from '../../database/events';
import { userSchema } from '../../migrations/00000-createTableUsers';
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

  return (
    <>
      <div>
        <DisplayEvents events={events}></DisplayEvents>
        {/* <Footer customFooter="customFooterLogin" /> */}
      </div>
    </>
  );
}
