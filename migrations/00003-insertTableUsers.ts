import type { Sql } from 'postgres';
import { sql } from '../database/connect';

const users = [
  {
    membership_id: 1234567,
    password: '1234567',
    isAdmin: true,
  },
];
export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
    INSERT INTO
    users(
      membership_id,
      password,
      isAdmin
    )
    VALUES
    (
        ${user.membership_id},
        ${user.password},
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
