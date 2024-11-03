import { cache } from 'react';
import { sql } from './connect';

export type User = {
  id?: number;
  password_hash: string;
  first_name: string;
  last_name: string;
  occupation?: string;
  intro_text?: string;
  profile_picture?: string;
  email?: string;
  linkedin?: string;
  isAdmin: boolean;
  created_at?: Date;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
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

// checking if user exists already in database
export const getUserInsecure = cache(async (id: number) => {
  const users = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
    id = ${id}
  `;

  return users;
});

export const createUserInsecure = cache(
  async (
    first_name: User['first_name'],
    last_name: User['last_name'],
    passwordHash: UserWithPasswordHash['passwordHash'],
  ) => {
    const [user] = await sql<User[]>`
    INSERT INTO
      users (
        first_name,
        last_name,
        passwordHash


      )
    VALUES
      (
        ${first_name},
        ${last_name},
        ${passwordHash},
      )
    RETURNING
      users.id,
      users.first_name,
      users.last_name
  `;

    return user;
  },
);
