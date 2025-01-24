import { cache } from 'react';
import type { Event } from '../migrations/00002-createTableEvents';
import type {
  CreateUserRsvp,
  EventRsvp,
  Rsvp,
  UserRsvp,
} from '../migrations/00006-rsvp';
import { sql } from './connect';
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
export const getEventRsvp = cache(async (eventId: Event['id']) => {
  const rsvp = await sql<EventRsvp[]>`
    SELECT DISTINCT
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
    WHERE
      events.id = ${eventId}
      AND rsvp.rsvp_status IS TRUE
  `;
  console.log('rsvp with user and event', rsvp);
  return rsvp;
});

// eslint-disable-next-line no-restricted-syntax
export const getUserRsvp = cache(async (userId: User['id']) => {
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
