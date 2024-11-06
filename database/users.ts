import { cache } from 'react';
import { sql } from './connect';

export type User = {
  id?: number;
  passwordHash: string;
  firstName: string;
  lastName: string;
  occupation?: string;
  introText?: string;
  profilePicture?: string;
  email: string;
  linkedin?: string;
  isAdmin: boolean;
  createdAt?: Date;
};

type UserWithPasswordHash = User & {
  email: string;
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
      email,
      password_hash
    FROM
      users
    WHERE
      email = ${email}
  `;

  console.log('Raw user object:', user); // Log before returning
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

export const getUserWithPasswordHashInsecure = cache(
  async (email: User['email']) => {
    // Retrieve the user with password_hash explicitly aliased
    const [user] = await sql<UserWithPasswordHash[]>`
      SELECT
        email,
        password_hash
      FROM
        users
      WHERE
        email = ${email}
    `;
    return user;
  },
);
