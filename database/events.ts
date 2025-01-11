import { cache } from 'react';
import type { Session } from '../migrations/00004-sessions';
import type { Rsvp } from '../migrations/00006-rsvp';
import type { User } from './users';

// import { sql } from './connect';

export type Event = {
  id: number;
  eventTitle: string;
  eventDescription: string;
  eventLocation: string;
  eventDate: Date;
  hostedBy: string;
  eventImage?: string | null;
  eventCosts: string;
  createdBy: number;
  User?: User;
  rsvps?: Rsvp[];
};

// export const getEventInsecure = cache(async (eventId: Event['id']) => {
//   const event = await sql<Event[]>`
//     SELECT
//       id,
//       event_title,
//       event_description,
//       event_location,
//       event_date,
//       hosted_by,
//       event_image,
//       event_costs,
//       created_by
//     FROM
//       events
//     WHERE
//       id = ${eventId}
//   `;
//   return event;
// });

// export const getEventsInsecure = cache(async () => {
//   const events = await sql<Event[]>`
//     SELECT
//       *
//     FROM
//       events
//     ORDER BY
//       event_date ASC
//   `;

//   return events;
// });

// export const createEventInsecure = cache(
//   async (
//     eventTitle: Event['eventTitle'],
//     eventDescription: Event['eventDescription'],
//     eventLocation: Event['eventLocation'],
//     eventDate: Event['eventDate'],
//     hostedBy: Event['hostedBy'],
//     eventImage: Event['eventImage'],
//     eventCosts: Event['eventCosts'],
//   ) => {
//     const [event] = await sql<Event[]>`
//       INSERT INTO
//         events (
//           event_title,
//           event_description,
//           event_location,
//           event_date,
//           hosted_by,
//           event_image,
//           event_costs
//         )
//       VALUES
//         (
//           ${eventTitle},
//           ${eventDescription},
//           ${eventLocation},
//           ${eventDate},
//           ${hostedBy},
//           ${eventImage},
//           ${eventCosts}
//         )
//       RETURNING
//         event_title,
//         event_description,
//         event_location,
//         event_date,
//         hosted_by,
//         event_image,
//         event_costs
//     `;

//     return event;
//   },
// );

// export const deleteEventInsecure = cache(async (id: number) => {
//   const [event] = await sql<Event[]>`
//     DELETE FROM events
//     WHERE
//       events.id = ${id}
//     RETURNING
//       events.*
//   `;
//   console.log('is event transferred:', event);
//   if (!event) {
//     throw new Error('Event not found');
//   }

//   // returns only if event is deleted successfully
//   console.log('event successfully removed', event);
//   return event;
// });
