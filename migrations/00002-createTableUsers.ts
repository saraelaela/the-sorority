import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      password_hash varchar(100) NOT NULL,
      first_name varchar(100) NOT NULL,
      surname varchar(100)  NOT NULL,
      occupation varchar(100),
      intro_text varchar(500),
      profile_picture varchar(200),
      email varchar(200) UNIQUE NOT NULL,
      linkedin varchar(200),
      isAdmin BOOLEAN DEFAULT false
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE users
  `;
}
