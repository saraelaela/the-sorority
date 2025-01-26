import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    ALTER TABLE rsvp
    ALTER COLUMN created_at type timestamptz USING created_at::timestamptz;
  `;
}

export async function down(sql: Sql) {
  await sql`
    ALTER TABLE rsvp
    ALTER COLUMN created_at type date USING created_at::date;
  `;
}
