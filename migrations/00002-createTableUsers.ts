import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
   CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      password_hash varchar(255) NOT NULL,
      first_name varchar(80) NOT NULL,
      surname varchar(80) NOT NULL,
      occupation varchar(100),
      intro_text varchar(255),
      profile_picture varchar(200),
      email varchar(200),
      linkedin varchar(200),
      isAdmin boolean

    )
  `;
} //perform operation

export async function down(sql: Sql) {
  await sql` DROP TABLE users `;
} // reverse operation
