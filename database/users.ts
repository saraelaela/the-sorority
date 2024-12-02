import { cache } from 'react';
import type { Session } from '../migrations/00004-sessions';
import { sql } from './connect';

type UserWithPasswordHash = User & {
  passwordHash: string;
};

export const getUser = cache(async (sessionToken: Session['token']) => {
  // Retrieve the user with passwordHash explicitly aliased
  const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      users.id,
      users.password_hash,
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

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  occupation: string | null;
  introText: string | null;
  profilePicture: string | null;
  email: string;
  linkedin: string | null;
  isAdmin: boolean | null;
};
export type registeredUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export const getUsersInsecure = cache(async () => {
  const users = await sql<User[]>`
    SELECT
      id,
      first_name,
      last_name,
      occupation,
      intro_text,
      profile_picture,
      email,
      linkedin,
      is_admin
    FROM
      users
  `;
  console.log('users setup', users);
  return users;
});

export type UpdateUser = {
  id: number;
  firstName: string;
  lastName: string;
  occupation: null | string;
  introText: null | string;
  profilePicture: null | string;
  linkedin: null | string;
};
export type CreateUser = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

export const updateUsersInsecure = cache(
  async (
    id: number,
    firstName: UpdateUser['firstName'],
    lastName: UpdateUser['lastName'],
    occupation: UpdateUser['occupation'],
    introText: UpdateUser['introText'],
    profilePicture: UpdateUser['profilePicture'],
    linkedin: UpdateUser['linkedin'],
  ) => {
    const users = await sql<UpdateUser[]>`
      UPDATE users
      SET
        first_name = ${firstName},
        last_name = ${lastName},
        occupation = ${occupation ?? ''},
        intro_text = ${introText ?? ''},
        profile_picture = ${profilePicture ?? ''},
        linkedin = ${linkedin ?? ''}
      WHERE
        id = ${id}
      RETURNING
        id,
        first_name,
        last_name,
        occupation,
        intro_text,
        profile_picture,
        linkedin;
    `;

    return users;
  },
);

//check if user with email already exists
export const getUserInsecure = cache(async (email: User['email']) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      first_name,
      last_name,
      occupation,
      intro_text,
      profile_picture,
      email,
      linkedin,
      is_admin
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
    const [user] = await sql<CreateUser[]>`
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
        users.first_name,
        users.last_name
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
        last_name,
        occupation,
        intro_text,
        profile_picture,
        email,
        linkedin,
        is_admin,
        password_hash
      FROM
        users
      WHERE
        email = ${email}
    `;

    return user;
  },
);
