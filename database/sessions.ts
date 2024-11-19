import { cache } from 'react';
import type { Session } from '../migrations/00004-sessions';
import { sql } from './connect';
import type { User } from './users';

export const getValidSessionToken = cache(
  async (sessionToken: Session['token']) => {
    const [session] = await sql<Session[]>`
      SELECT
        sessions.token,
        sessions.user_id
      FROM
        sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
    `;

    return session;
  },
);

export const createSessionInsecure = cache(
  async (userId: User['id'], token: Session['token']) => {
    const [session] = await sql<Session[]>`
      INSERT INTO
        sessions (user_id, token)
      VALUES
        (
          ${userId},
          ${token}
        )
      RETURNING
        *
    `;

    return session;
  },
);
export const deleteSession = cache(async (sessionToken: Session['token']) => {
  const [session] = await sql<Session[]>`
    DELETE FROM sessions
    WHERE
      sessions.token = ${sessionToken}
    RETURNING
      sessions.token,
      sessions.user_id
  `;

  return session;
});
