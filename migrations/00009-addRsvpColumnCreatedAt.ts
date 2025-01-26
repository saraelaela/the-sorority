import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    ALTER TABLE rsvp
    ADD created_at date
  `;
}

export async function down(sql: Sql) {
  await sql`
    ALTER TABLE rsvp
    DROP COLUMN created_at;
  `;
}
