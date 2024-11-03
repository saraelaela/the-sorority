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
  email: string;
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

//check if user with email already exists
export const getUserInsecure = cache(async (email: User['email']) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      email
    FROM
      users
    WHERE
      email = ${email}
  `;

  return user;
});

export const createUserInsecure = cache(
  async (
    email: User['email'],
    password_hash: UserWithPasswordHash['password_hash'],
    first_name: User['first_name'],
    last_name: User['last_name'],
  ) => {
    const [user] = await sql<User[]>`
    INSERT INTO
      users (
        email,
        password_hash,
        first_name,
        last_name


      )
    VALUES
      (
        ${email},
        ${password_hash},
        ${first_name},
        ${last_name}
      )
    RETURNING
      users.id,
      users.email
  `;

    return user;
  },
);
