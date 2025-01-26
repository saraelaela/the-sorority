import type { Sql } from 'postgres';
import { z } from 'zod';

export const rsvpSchema = z.object({
  userId: z.number(),
  eventId: z.number(),
  rsvpStatus: z.boolean(),
  createdAt: z.coerce.date(),
});

export type Rsvp = {
  id: number;
  rsvpStatus: boolean;
  userId: number;
  firstName: string;
  eventId: number;
  eventTitle: string | null;
  eventDate: Date;
  eventLocation: string | null;
  createdAt: Date;
};
export type EventRsvp = {
  id: number;
  rsvpStatus: boolean;
  userId: number;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  eventId: number;
  eventTitle: string | null;
  eventDate: Date;
  eventLocation: string | null;
};
export type CreateUserRsvp = {
  userId: number;
  eventId: number;
  rsvpStatus: boolean;
  createdAt: Date;
};

export type PreventDoubleRsvp = {
  id: number;
};
export type UserRsvp = {
  id: number;
  rsvpStatus: boolean;
  eventTitle: string | null;
  eventDate: Date;
  eventLocation: string | null;
};
export type EventRsvpOverview = {
  id: number;
  rsvpStatus: boolean;
  userId: number;
  firstName: string;
  profilePicture: string | null;
  createdAt: Date;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE rsvp (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      rsvp_status boolean NOT NULL,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade,
      event_id integer NOT NULL REFERENCES events (id) ON DELETE cascade,
      UNIQUE (user_id, event_id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE rsvp `;
}
