import type { Sql } from 'postgres';
import { sql } from '../database/connect';

const users = [
  {
    password_hash: '1234567',
    first_name: 'Sara',
    surname: 'Ela',
    occupation: 'designer',
    intro_text: 'Hey this is my Intro',
    profile_picture: 'xxx',
    email: 'sara@email.com',
    linkedin: 'linkedin.de',
    isAdmin: true,
  },
];
export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
    INSERT INTO
    users(
      password_hash,
      first_name,
      surname,
      occupation,
      intro_text,
      profile_picture,
      email,
      linkedin,
      isAdmin
    )
    VALUES
    (

        ${user.password_hash},
        ${user.first_name},
        ${user.surname},
        ${user.occupation},
        ${user.intro_text},
        ${user.profile_picture},
        ${user.email},
        ${user.linkedin},
        ${user.isAdmin}
    )
    `;
  }
}

export async function down(sql: Sql) {
  for (const user of users) {
    await sql`DELETE FROM users`;
  }
}
