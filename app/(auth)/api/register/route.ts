import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
//import { createSessionInsecure } from '../../../../database/sessions';
import { type registeredUser, type User } from '../../../../database/users';
import { userSchema } from '../../../../migrations/00000-createTableUsers';
import { prisma } from '../../../../src/lib/db';
import { secureCookieOptions } from '../../../../util/cookies';

export type RegisterResponseBody =
  | {
      user: registeredUser;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: Request,
): Promise<NextResponse<RegisterResponseBody>> {
  // Task: Implement the user registration workflow

  // 1. Get the user data from the request
  const requestBody = await request.json();

  // 2. Validate User Data w zod
  const result = userSchema.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  //3. Check if user exists
  const user = await prisma.user.findUnique({
    where: {
      email: result.data.email,
    },
  });

  if (user) {
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Email is already in use',
          },
        ],
      },
      {
        status: 400,
      },
    );
  }
  //4. Hash the password
  const passwordHash = await bcrypt.hash(result.data.password, 12);

  // 5. Save user info w/ passwordhash
  const newUser = await prisma.user.create({
    data: {
      email: result.data.email,
      passwordHash,
      firstName: result.data.firstName,
      lastName: result.data.lastName,
    },
  });

  // const newUser = await createUserInsecure(
  //   result.data.email,
  //   passwordHash,
  //   result.data.firstName,
  //   result.data.lastName,
  //   // result.data.isAdmin,
  // );

  if (!newUser) {
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Registration failed',
          },
        ],
      },
      {
        status: 400,
      },
    );
  }
  // 6. Create a token
  const token = crypto.randomBytes(100).toString('base64');

  const session = await prisma.session.create({
    data: {
      token: token,
      userId: newUser.id,
      expiryTimestamp: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    include: {
      User: true,
    },
  });
  // 7. Create the session record
  // const session = await createSessionInsecure(newUser.id, token);

  if (!session) {
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Problem creating session',
          },
        ],
      },
      {
        status: 400,
      },
    );
  }

  (await cookies()).set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  return NextResponse.json({ user: newUser });
}
