import { cache } from 'react';
import type { Rsvp } from '../migrations/00006-rsvp';
import { sql } from './connect';

export const getAllRsvpInsecure = cache(async () => {
  const rsvp = await sql<Rsvp[]>`
    SELECT
      *
    FROM
      rsvp
  `;
  console.log('rsvp setup', rsvp);
  return rsvp;
});

// sort rsvp after User
export const getUserRsvp = cache(async (id: Rsvp['id']) => {
  const [rsvp] = await sql<Rsvp[]>`
    SELECT
      user_id,
      event_id,
      rsvp_status
    FROM
      rsvp
  `;
  return rsvp;
});

export const createUserRsvp = cache(
  async (
    userId: Rsvp['userId'],
    eventId: Rsvp['eventId'],
    rsvpStatus: Rsvp['rsvpStatus'],
  ) => {
    const [rsvp] = await sql<Rsvp[]>`
      INSERT INTO
        rsvp (
          user_id,
          event_id,
          rsvp_status
        )
      VALUES
        (
          ${userId},
          ${eventId},
          ${rsvpStatus}
        )
      RETURNING
        rsvp.user_id,
        rsvp.event_id,
        rsvp.rsvp_status
    `;

    return rsvp;
  },
);
