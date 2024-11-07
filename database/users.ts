import { cache } from 'react';
import { sql } from './connect';

export type User = {
  id: number;
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
      first_name,
      email,
      password_hash
    FROM
      users
    WHERE
      email = ${email}
  `;
  console.log('Email passed to getUserInsecure:', email);
  console.log('Retrieved user:', user); // Log after the query to see what the database returns

  return user;
});

export const createUserInsecure = cache(
  async (
    email: User['email'],
    passwordHash: UserWithPasswordHash['passwordHash'],
    firstName: User['firstName'],
    lastName: User['lastName'],
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
          ${passwordHash},
          ${firstName},
          ${lastName}
        )
      RETURNING
        users.id,
        users.email,
        users.first_name
    `;

    return user;
  },
);

export const getUserWithPasswordHashInsecure = cache(
  async (email: User['email']) => {
    // Retrieve the user with passwordHash explicitly aliased
    const [user] = await sql<UserWithPasswordHash[]>`
      SELECT
        id,
        first_name,
        email,
        password_hash
      FROM
        users
      WHERE
        email = ${email}
    `;
    console.log('Retrieved user with ID:', user);

    return user;
  },
);
