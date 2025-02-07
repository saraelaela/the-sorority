import { cache } from 'react';
import type {
  CreateUserRsvp,
  EventRsvpOverview,
  Rsvp,
  UserRsvp,
} from '../migrations/00006-rsvp';
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
      events.event_location AS event_location,
      rsvp.created_at
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

export const getAllEventRsvp = cache(async (eventId: Event['id']) => {
  const eventRsvps = await sql<EventRsvpOverview[]>`
    SELECT
      rsvp.id,
      rsvp.rsvp_status,
      rsvp.created_at,
      rsvp.user_id,
      users.first_name,
      users.profile_picture
    FROM
      rsvp
      JOIN users ON rsvp.user_id = users.id
    WHERE
      rsvp.event_id = ${eventId}
    ORDER BY
      created_at
  `;
  return eventRsvps;
});

// eslint-disable-next-line no-restricted-syntax
export const createUserRsvp = cache(
  async (
    userId: Rsvp['userId'],
    eventId: Rsvp['eventId'],
    rsvpStatus: Rsvp['rsvpStatus'],
    createdAt: CreateUserRsvp['createdAt'],
  ) => {
    console.log('4. Before SQL insertion timestamp:', createdAt);
    const [rsvp] = await sql<CreateUserRsvp[]>`
      INSERT INTO
        rsvp (
          user_id,
          event_id,
          rsvp_status,
          created_at
        )
      VALUES
        (
          ${userId},
          ${eventId},
          ${rsvpStatus},
          ${createdAt}::timestamptz
        )
      RETURNING
        rsvp.user_id,
        rsvp.event_id,
        rsvp.rsvp_status,
        rsvp.created_at
    `;
    console.log('5. After SQL insertion timestamp 4:', rsvp?.createdAt);
    return rsvp;
  },
);
