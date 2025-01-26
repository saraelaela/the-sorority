import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    ALTER TABLE rsvp
    ALTER COLUMN created_at
    SET NOT NULL,
    ALTER COLUMN created_at
    SET DEFAULT now();
  `;
}

export async function down(sql: Sql) {
  await sql`
    ALTER TABLE rsvps
    ALTER COLUMN created_at
    DROP NOT NULL,
    ALTER COLUMN created_at
    DROP DEFAULT;
  `;
}
