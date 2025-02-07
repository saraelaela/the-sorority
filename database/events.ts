import { cache } from 'react';
import type { Session } from '../migrations/00004-sessions';
import { sql } from './connect';

export type Event = {
  id: number;
  eventTitle: string | null;
  eventDescription: string | null;
  eventLocation: string | null;
  eventDate: Date;
  hostedBy: string | null;
  eventImage: string | null;
  eventCosts: string | null;
  createdBy: number | null;
};
export type CreateEvent = {
  eventTitle: null | string;
  eventDescription: null | string;
  eventLocation: null | string;
  eventDate: Date;
  hostedBy: null | string;
  eventImage: null | string;
  eventCosts: null | string;
};
export type UpdateEvent = {
  id: number;
  eventTitle: null | string;
  eventDescription: null | string;
  eventLocation: null | string;
  eventDate: Date;
  hostedBy: null | string;
  eventImage: null | string;
  eventCosts: null | string;
};

export const getEventInsecure = cache(async (eventId: Event['id']) => {
  const event = await sql<Event[]>`
    SELECT
      id,
      event_title,
      event_description,
      event_location,
      event_date,
      hosted_by,
      event_image,
      event_costs,
      created_by
    FROM
      events
    WHERE
      id = ${eventId}
  `;
  return event;
});

export const getEventsInsecure = cache(async () => {
  const events = await sql<Event[]>`
    SELECT
      *
    FROM
      events
    ORDER BY
      event_date ASC
  `.catch((error) => {
    console.error('Failed to fetch events:', error);
    return [];
  });

  return events;
});

export const createEventInsecure = cache(
  async (
    eventTitle: Event['eventTitle'],
    eventDescription: Event['eventDescription'],
    eventLocation: Event['eventLocation'],
    eventDate: Event['eventDate'],
    hostedBy: Event['hostedBy'],
    eventImage: Event['eventImage'],
    eventCosts: Event['eventCosts'],
  ) => {
    const [event] = await sql<CreateEvent[]>`
      INSERT INTO
        events (
          event_title,
          event_description,
          event_location,
          event_date,
          hosted_by,
          event_image,
          event_costs
        )
      VALUES
        (
          ${eventTitle},
          ${eventDescription},
          ${eventLocation},
          ${eventDate},
          ${hostedBy},
          ${eventImage},
          ${eventCosts}
        )
      RETURNING
        event_title,
        event_description,
        event_location,
        event_date,
        hosted_by,
        event_image,
        event_costs
    `;

    return event;
  },
);

export const updateEventInsecure = cache(
  async (
    id: Event['id'],
    eventTitle: Event['eventTitle'],
    eventDescription: Event['eventDescription'],
    eventLocation: Event['eventLocation'],
    eventDate: Event['eventDate'],
    hostedBy: Event['hostedBy'],
    eventImage: Event['eventImage'],
    eventCosts: Event['eventCosts'],
  ) => {
    const event = await sql<UpdateEvent[]>`
      UPDATE events
      SET
        event_title = ${eventTitle},
        event_description = ${eventDescription},
        event_location = ${eventLocation ?? ''},
        event_date = ${eventDate ?? ''},
        hosted_by = ${hostedBy ?? ''},
        event_image = ${eventImage ?? ''},
        event_costs = ${eventCosts ?? ''}
      WHERE
        id = ${id}
      RETURNING
        id,
        event_title,
        event_description,
        event_location,
        event_date,
        hosted_by,
        event_image,
        event_costs;
    `;

    return event;
  },
);

export const deleteEventInsecure = cache(async (id: number) => {
  const [event] = await sql<Event[]>`
    DELETE FROM events
    WHERE
      events.id = ${id}
    RETURNING
      events.*
  `;
  console.log('is event transferred:', event);
  if (!event) {
    throw new Error('Event not found');
  }

  // returns only if event is deleted successfully
  console.log('event successfully removed', event);
  return event;
});
