import { cache } from 'react';
import { sql } from './connect';

export type Event = {
  id: number;
  eventTitle: string;
  eventDescription: string;
  eventLocation: string;
  eventDate: Date;
  hostedBy: string;
  eventImage?: string;
  eventCosts: string;
  createdBy: number;
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
  console.log('is it returning?', event);
  return event;
});

export const getEventsInsecure = cache(async () => {
  const events = await sql<Event[]>`
    SELECT
      *
    FROM
      events
  `;

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
    createdBy: Event['createdBy'],
  ) => {
    const [event] = await sql<Event[]>`
      INSERT INTO
        events (
          event_title,
          event_description,
          event_location,
          event_date,
          hosted_by,
          event_image,
          event_costs,
          created_by
        )
      VALUES
        (
          ${eventTitle},
          ${eventDescription},
          ${eventLocation},
          ${eventDate},
          ${hostedBy},
          ${eventImage},
          ${eventCosts},
          ${createdBy}
        )
      RETURNING
        event_title,
        event_description,
        event_location,
        event_date,
        hosted_by,
        event_image,
        event_costs,
        created_by
    `;

    return event;
  },
);
