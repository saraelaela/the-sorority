import { cache } from 'react';
import type { Session } from '../migrations/00004-sessions';
import type { Payment } from '../migrations/00005-payment';
import type { Rsvp } from '../migrations/00006-rsvp';
import type { BlogPost } from '../migrations/00007-createTableMagazinee';
import { prisma } from '../src/lib/db';

// import { sql } from './connect';

export type User = {
  id: number;
  passwordHash: string;
  firstName: string;
  lastName: string;
  occupation?: string | null;
  introText?: string | null;
  profilePicture?: string | null;
  email: string;
  linkedin?: string | null;
  isAdmin: boolean;
  events?: Event[];
  sessions?: Session[];
  payments?: Payment[];
  rsvps?: Rsvp[];
  blogPosts?: BlogPost[];
};

type UserWithPasswordHash = User & {
  passwordHash: string;
};

export type registeredUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export const getUser = cache(async (sessionToken: Session['token']) => {
  const user = await prisma.user.findFirst({
    where: {
      sessions: {
        some: {
          token: sessionToken,
          expiryTimestamp: {
            gt: new Date(),
          },
        },
      },
    },
    select: {
      id: true,
      passwordHash: true,
      firstName: true,
      lastName: true,
      occupation: true,
      introText: true,
      profilePicture: true,
      email: true,
      linkedin: true,
      isAdmin: true,
    },
  });

  return user;
});

export const getUsersInsecure = cache(async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      occupation: true,
      introText: true,
      profilePicture: true,
      email: true,
      linkedin: true,
      isAdmin: true,
    },
  });

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

// Update user
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
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        firstName,
        lastName,
        occupation: occupation ?? '',
        introText: introText ?? '',
        profilePicture: profilePicture ?? '',
        linkedin: linkedin ?? '',
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        occupation: true,
        introText: true,
        profilePicture: true,
        linkedin: true,
      },
    });

    return user;
  },
);

// Get user by email
export const getUserInsecure = cache(async (email: User['email']) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      occupation: true,
      introText: true,
      profilePicture: true,
      email: true,
      linkedin: true,
      isAdmin: true,
    },
  });

  return user;
});

// Create new user
export const createUserInsecure = cache(
  async (
    email: User['email'],
    passwordHash: UserWithPasswordHash['passwordHash'],
    firstName: User['firstName'],
    lastName: User['lastName'],
  ) => {
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    return user;
  },
);

// Get user with password hash
export const getUserWithPasswordHashInsecure = cache(
  async (email: User['email']) => {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        occupation: true,
        introText: true,
        profilePicture: true,
        email: true,
        linkedin: true,
        isAdmin: true,
        passwordHash: true,
      },
    });

    return user;
  },
);
