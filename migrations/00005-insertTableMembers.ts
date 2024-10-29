import type { Sql } from 'postgres';
import { sql } from '../database/connect';

const members = [
  {
    membership_id: 1234567,
    name: 'Sara',
    surname: 'El Abed',
  },
];
export async function up(sql: Sql) {
  for (const user of members) {
    await sql`
    INSERT INTO
    members(
      membership_id,
      name,
      surname
    )
    VALUES
    (
        ${user.membership_id},
        ${user.name},
        ${user.surname}
    )
    `;
  }
}

export async function down(sql: Sql) {
  for (const user of members) {
    await sql`DELETE FROM members`;
  }
}
