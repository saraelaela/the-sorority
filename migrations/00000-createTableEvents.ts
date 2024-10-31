import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE events (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      event_title varchar(100),
      event_description varchar(500),
      event_location varchar(200),
      event_date date NOT NULL,
      created_by integer REFERENCES users(id) ON DELETE cascade,
      event_image varchar(255),
      event_costs varchar(255)
    )
  `;
} //perform operation

export async function down(sql: Sql) {
  await sql` DROP TABLE events `;
} // reverse operation
