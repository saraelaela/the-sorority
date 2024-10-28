import type { Sql } from 'postgres';
import { sql } from '../database/connect';

const events = [
  {
    event_title: 'event1',
    event_description: 'a description',
    location: 'WUK Wien',
    event_date: new Date('2025-02-01'),
  },
  {
    event_title: 'event2',
    event_description: 'a 2 description',
    location: 'WUK Wien',
    event_date: new Date('2025-02-02'),
  },
  {
    event_title: 'event3',
    event_description: 'a 3 description',
    location: 'WUK Wien',
    event_date: new Date('2025-02-03'),
  },
  {
    event_title: 'event4',
    event_description: 'a 4 description',
    location: 'WUK Wien',
    event_date: new Date('2025-02-03'),
  },
];

export async function up(sql: Sql) {
  for (const event of events) {
    await sql`
    INSERT INTO
    events(
      event_title,
      event_description,
      location,
      event_date
    )
    VALUES
    (
        ${event.event_title},
        ${event.event_description},
        ${event.location},
        ${event.event_date}
    )
    `;
  }
}

export async function down(sql: Sql) {
  for (const event of events) {
    await sql`DELETE FROM events`;
  }
}
