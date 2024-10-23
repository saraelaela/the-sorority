import { cache } from 'react';
import { sql } from './connect';

export type User = {
  id?: number;
  username: string;
  password: string;
  email: string | null;
  role?: string;
  intro_text?: string;
  profile_picture?: string;
  created_at?: Date;
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

export const createUserInsecure = cache(async (newUser: Omit<User, 'id'>) => {
  const [user] = await sql<User[]>`
    INSERT INTO
      users (
        username,
        password,
        email,
        role,
        intro_text,
        profile_picture,
        created_at
      )
    VALUES
      (
        ${newUser.username},
        ${newUser.password},
        ${newUser.email},
        ${newUser.role},
        ${newUser.introText},
        ${newUser.profilePicture},
        ${newUser.createdAt}
      )
    RETURNING
      users.*
  `;

  return user;
});
