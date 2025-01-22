'use server';
import React from 'react';
import { getUserRsvp } from '../../../database/rsvp';

type Props = {
  id: number;
};

export default async function Attendees(props: Props) {
  const rsvp = await getUserRsvp(props.id);
  console.log('users that rsvp', rsvp);
  return <div>Attendees: {rsvp?.userId}</div>;
}
