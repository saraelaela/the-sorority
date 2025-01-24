import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    ALTER TABLE rsvp
    ADD CONSTRAINT uc_rsvp UNIQUE (user_id, event_id)
  `;
}

export async function down(sql: Sql) {
  await sql`
    ALTER TABLE rsvp
    DROP CONSTRAINT uc_rsvp
  `;
}
