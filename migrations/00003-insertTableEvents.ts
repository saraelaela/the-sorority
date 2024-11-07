import type { Sql } from 'postgres';
import { sql } from '../database/connect';

const events = [
  {
    eventTitle: 'event1',
    eventDescription: 'a description',
    eventLocation: 'WUK Wien',
    eventDate: new Date('2025-02-01'),
    createdBy: 1,
    eventImage: 'xxx',
    eventCosts: '20 % auf Kategorie 5',
  },
];

export async function up(sql: Sql) {
  for (const event of events) {
    await sql`
    INSERT INTO
    events(
      event_title,
      event_description,
      event_location,
      event_date,
      created_by,
      event_image,
      event_costs

    )
    VALUES
    (
        ${event.eventTitle},
        ${event.eventDescription},
        ${event.eventLocation},
        ${event.eventDate},
        ${event.createdBy},
        ${event.eventImage},
        ${event.eventCosts}
    )
    `;
  }
}

export async function down(sql: Sql) {
  for (const event of events) {
    await sql`DELETE FROM events`;
  }
}
