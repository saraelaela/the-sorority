import type { Sql } from 'postgres';
import { z } from 'zod';

// 2) validate Data w/ zod
export const eventSchema = z.object({
  eventTitle: z.string().min(1, 'Event title is required'),
  eventDescription: z.string().min(1, 'Event description is required'),
  eventLocation: z.string().min(1, 'Event location is required'),
  eventDate: z.coerce.date(),
  hostedBy: z.string().min(1, 'Host information is required'),
  eventImage: z.string().url().optional(),
  eventCosts: z.number(),
  createdBy: z.string().min(1, 'Creator information is required'),
});

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

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE events (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      event_title varchar(100),
      event_description varchar(500),
      event_location varchar(200),
      event_date date NOT NULL,
      hosted_by varchar(500),
      event_image varchar(255),
      event_costs varchar(255),
      created_by integer REFERENCES users (id) ON DELETE cascade,
    )
  `;
} //perform operation

export async function down(sql: Sql) {
  await sql` DROP TABLE events `;
} // reverse operation
