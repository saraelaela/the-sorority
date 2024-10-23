import { cache } from 'react';
import { sql } from './connect';

export type User = {
  id?: number;
  username: string;
  password: string;
  email: string | null;
  role: string;
  intro_text: string;
  profile_picture: string;
  created_at: Date;
};

export const getUsersInsecure = cache(async () => {
  const users = await sql<User[]>`
    SELECT
      *
    FROM
      users
  `;

  return users;
});
