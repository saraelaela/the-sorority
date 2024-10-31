import type { Sql } from 'postgres';
import { sql } from '../database/connect';

const events = [
  {
    event_title: 'event1',
    event_description: 'a description',
    event_location: 'WUK Wien',
    event_date: new Date('2025-02-01'),
    created_by: 'user4',
    event_image: 'xxx',
    event_costs: '20 % auf Kategorie 5',
  },
  {
    event_title: 'event2',
    event_description: 'a 2 description',
    event_location: 'WUK Wien',
    event_date: new Date('2025-02-02'),
    created_by: 'user4',
    event_image: 'xxx',
    event_costs: '20 % auf Kategorie 5',
  },
  {
    event_title: 'event3',
    event_description: 'a 3 description',
    event_location: 'WUK Wien',
    event_date: new Date('2025-02-03'),
    created_by: 'user4',
    event_image: 'xxx',
    event_costs: '20 % auf Kategorie 5',
  },
  {
    event_title: 'event4',
    event_description: 'a 4 description',
    event_location: 'WUK Wien',
    event_date: new Date('2025-02-03'),
    created_by: 'user4',
    event_image: 'xxx',
    event_costs: '20 % auf Kategorie 5',
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
        ${event.event_title},
        ${event.event_description},
        ${event.event_location},
        ${event.event_date},
        ${event.created_by}
        ${event.event_image}
        ${event.event_costs}
    )
    `;
  }
}

export async function down(sql: Sql) {
  for (const event of events) {
    await sql`DELETE FROM events`;
  }
}
