import type { Sql } from 'postgres';
import { z } from 'zod';

export type Rsvp = {
  // id: number;
  userId: number;
  eventId: number;
  rsvpStatus: boolean;
};

export const rsvpSchema = z.object({
  // id: z.number(),
  userId: z.number(),
  eventId: z.number(),
  rsvpStatus: z.boolean(),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE rsvp (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade,
      event_id integer NOT NULL REFERENCES events (id) ON DELETE cascade,
      rsvp_status boolean DEFAULT FALSE
    )
  `;
} //perform operation

export async function down(sql: Sql) {
  await sql` DROP TABLE rsvp `;
} // reverse operation
