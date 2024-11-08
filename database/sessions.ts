import { cache } from 'react';
import type { Session } from '../migrations/00004-sessions';
import { sql } from './connect';
import type { User } from './users';

export const createSessionInsecure = cache(
  async (userId: User['id'], token: Session['token']) => {
    console.log('User ID before session creation:', userId);
    console.log('Token:', token);

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
