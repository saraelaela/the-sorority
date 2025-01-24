'use server';

import React from 'react';
import type { Event } from '../../../database/events';
import { getUserRsvp } from '../../../database/rsvp';
import type { User } from '../../../database/users';
import type { Session } from '../../../migrations/00004-sessions';
import DisplayEvents from './DisplayEvents';

type Props = {
  events: Event[];
  user?: User | null;
  session?: Session;
};

export default async function Events(props: Props) {
  return (
    <div>
      <DisplayEvents
        session={props.session}
        events={props.events}
        user={props.user}
      />
    </div>
  );
}
