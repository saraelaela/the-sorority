import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE members (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      membership_id integer REFERENCES users(membership_id) ON DELETE CASCADE,  -- Reference users.membership_id
      name varchar(500),
      surname varchar(500)
    )
  `;
} //perform operation

export async function down(sql: Sql) {
  await sql` DROP TABLE  members `;
} // reverse operation
