import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      membership_id integer,
      password varchar(500),
      isAdmin boolean
    )
  `;
} //perform operation

export async function down(sql: Sql) {
  await sql` DROP TABLE users `;
} // reverse operation
