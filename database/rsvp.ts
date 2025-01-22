import { cache } from 'react';
import type { EventRsvp, Rsvp, UserRsvp } from '../migrations/00006-rsvp';
import { sql } from './connect';

export const getAllRsvpInsecure = cache(async () => {
  const rsvp = await sql<Rsvp[]>`
    SELECT
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

export const getEventRsvp = cache(async () => {
  const rsvp = await sql<EventRsvp[]>`
    SELECT
      rsvp.id,
      rsvp.rsvp_status,
      users.id AS user_id,
      users.first_name AS first_name,
      users.last_name AS last_name,
      users.profile_picture AS profile_picture,
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

// sort rsvp after User
export const getUserRsvp = cache(async (id: Rsvp['id']) => {
  const [rsvp] = await sql<UserRsvp[]>`
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
    const [rsvp] = await sql<UserRsvp[]>`
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
