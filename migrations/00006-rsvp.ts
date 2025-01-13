import type { Sql } from 'postgres';
import { z } from 'zod';

export type Rsvp = {
  id: number;
  rsvpStatus: boolean;
  userId: number;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE payment (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      rsvp_status boolean user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade,
      event_id integer NOT NULL REFERENCES events (id) ON DELETE cascade,
    )
  `;
} //perform operation

export async function down(sql: Sql) {
  await sql` DROP TABLE payment `;
} // reverse operation
