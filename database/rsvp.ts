import { cache } from 'react';
import type { CreateUserRsvp, Rsvp, UserRsvp } from '../migrations/00006-rsvp';
import { sql } from './connect';
import type { Event } from './events';
import type { User } from './users';

export const getAllRsvpInsecure = cache(async () => {
  const rsvp = await sql<Rsvp[]>`
    SELECT DISTINCT
      rsvp.id,
      rsvp.rsvp_status,
      users.id AS user_id,
      users.first_name AS first_name,
      events.id AS event_id,
      events.event_title AS event_title,
      events.event_date AS event_date,
      events.event_location AS event_location
    FROM
      rsvp
      JOIN users ON rsvp.user_id = users.id
      JOIN events ON rsvp.event_id = events.id
  `;
  console.log('rsvp with user and event', rsvp);
  return rsvp;
});

// eslint-disable-next-line no-restricted-syntax
export const getUserRsvp = cache(
  async (userId: User['id'], eventId: Event['id']) => {
    const rsvps = await sql<UserRsvp[]>`
      SELECT
        rsvp.id,
        rsvp.rsvp_status,
        events.event_title,
        events.event_date,
        events.event_location
      FROM
        rsvp
        JOIN events ON rsvp.event_id = events.id
      WHERE
        rsvp.user_id = ${userId}
        AND rsvp.event_id = ${eventId}
    `;
    return rsvps;
  },
);

export const getAllUserRsvp = cache(async (userId: User['id']) => {
  const rsvps = await sql<UserRsvp[]>`
    SELECT
      rsvp.id,
      rsvp.rsvp_status,
      events.event_title,
      events.event_date,
      events.event_location
    FROM
      rsvp
      JOIN events ON rsvp.event_id = events.id
    WHERE
      rsvp.user_id = ${userId}
  `;
  return rsvps;
});

// eslint-disable-next-line no-restricted-syntax
export const createUserRsvp = cache(
  async (
    userId: Rsvp['userId'],
    eventId: Rsvp['eventId'],
    rsvpStatus: Rsvp['rsvpStatus'],
  ) => {
    // const [existingRsvp] = await sql<PreventDoubleRsvp[]>`
    //   SELECT
    //     id
    //   FROM
    //     rsvp
    //   WHERE
    //     user_id = ${userId}
    //     AND event_id = ${eventId}
    // `;

    // if (existingRsvp) {
    //   return {
    //     error: "You have already RSVP'd to this event",
    //   };
    // }
    const [rsvp] = await sql<CreateUserRsvp[]>`
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
