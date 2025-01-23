'use server';

import React from 'react';
import type { Event } from '../../../database/events';
import { getEventRsvp, getUserRsvp } from '../../../database/rsvp';
import type { User } from '../../../database/users';
import type { Session } from '../../../migrations/00004-sessions';
import DisplayEvents from './DisplayEvents';

type Props = {
  events: Event[];
  user?: User | null;
  session?: Session;
};

export default async function Events(props: Props) {
  const rsvp = await getEventRsvp();
  const rsvpId = rsvp.find((rsvp) => rsvp.id)?.id;
  if (rsvpId) {
    const userRsvp = await getUserRsvp(rsvpId);
  }
  console.log('update on rsvp query', rsvp);

  return (
    <div>
      <DisplayEvents
        // userRsvp={userRsvp}
        session={props.session}
        events={props.events}
        user={props.user}
        rsvps={rsvp}
      />
    </div>
  );
}
