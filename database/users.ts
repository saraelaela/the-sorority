import { cache } from 'react';
import type { Session } from '../migrations/00004-sessions';
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
  linkedIn?: string;
  isAdmin: boolean;
  createdAt?: Date;
};

type UserWithPasswordHash = User & {
  email: string;
  passwordHash: string;
};

export const getUser = cache(async (sessionToken: Session['token']) => {
  // Retrieve the user with passwordHash explicitly aliased
  const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      users.id,
      users.first_name,
      users.last_name,
      users.occupation,
      users.intro_text,
      users.profile_picture,
      users.email,
      users.linkedin,
      users.is_admin
    FROM
      users
      INNER JOIN sessions ON (sessions.user_id = users.id)
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
  `;

  return user;
});

export const getUsersInsecure = cache(async () => {
  const users = await sql<User[]>`
    SELECT
      *
    FROM
      users
  `;
  console.log('users setup', users);
  return users;
});
export const updateUsersInsecure = cache(
  async (
    id: User['id'],
    firstName: User['firstName'],
    lastName: User['lastName'],
    occupation?: User['occupation'],
    introText?: User['introText'],
    profilePicture?: User['profilePicture'],
    linkedIn?: User['linkedIn'],
  ) => {
    const users = await sql<User[]>`
      UPDATE users
      SET
        first_name = ${firstName},
        last_name = ${lastName},
        occupation = ${occupation},
        intro_text = ${introText},
        profile_picture = ${profilePicture},
        linkedin = ${linkedIn}
      WHERE
        id = ${id}
      RETURNING
        *;

      -- Return the updated user(s)
    `;
    console.log('users setup', users);
    return users;
  },
);

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

    return user;
  },
);
