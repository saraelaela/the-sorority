'use server';

import React from 'react';
import type { Event } from '../../../database/events';
import { getEventRsvp } from '../../../database/rsvp';
import type { User } from '../../../database/users';
import type { Session } from '../../../migrations/00004-sessions';
import type { EventRsvp } from '../../../migrations/00006-rsvp';
import DisplayEvents from './DisplayEvents';

type Props = {
  events: Event[];
  user?: User | null;
  session?: Session;
};

export default async function Events(props: Props) {
  const rsvp = await getEventRsvp();
  console.log('update on rsvp query', rsvp);

  return (
    <div>
      <DisplayEvents
        session={props.session}
        events={props.events}
        user={props.user}
        rsvps={rsvp}
      />
    </div>
  );
}
