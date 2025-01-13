import type { Sql } from 'postgres';

const users = [
  {
    passwordHash: '1234567',
    firstName: 'Sara',
    lastName: 'Ela',
    occupation: 'designer',
    introText: 'Hey this is my Intro',
    profilePicture: 'xxx',
    email: 'sara@email.com',
    linkedin: 'linkedin.de',
    isAdmin: true,
  },
];
export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
      INSERT INTO
        users (
          password_hash,
          first_name,
          last_name,
          occupation,
          intro_text,
          profile_picture,
          email,
          linkedin,
          is_admin
        )
      VALUES
        (
          ${user.passwordHash},
          ${user.firstName},
          ${user.lastName},
          ${user.occupation},
          ${user.introText},
          ${user.profilePicture},
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
