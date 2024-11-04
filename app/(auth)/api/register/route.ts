import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createSessionInsecure } from '../../../../database/sessions';
import {
  createUserInsecure,
  getUserInsecure,
} from '../../../../database/users';
import {
  type User,
  userSchema,
} from '../../../../migrations/00002-createTableUsers';
import { secureCookieOptions } from '../../../../util/cookies';

export type RegisterResponseBody =
  | {
      user: User;
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
  console.log('requestBody', requestBody);

  // 2. Validate User Data w zod
  const result = userSchema.safeParse(requestBody);
  console.log('result', result);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  //3. Check if user exists
  const user = await getUserInsecure(result.data.email);
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

  console.log('user:', result.data);

  //4. Hash the password
  const password_hash = await bcrypt.hash(result.data.password, 12);
  console.log('passwordHash', password_hash);

  // 5. Save user info w/ passwordhash
  const newUser = await createUserInsecure(
    result.data.email,
    password_hash,
    result.data.first_name,
    result.data.last_name,
  );

  console.log('newUser', newUser);
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

  return NextResponse.json({ user: newUser });
}
