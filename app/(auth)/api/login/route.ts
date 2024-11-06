import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { getUserWithPasswordHashInsecure } from '../../../../database/users';
import {
  loginSchema,
  type User,
} from '../../../../migrations/00002-createTableUsers';

export type LoginResponseBody =
  | {
      user: { email: User['email'] };
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: Request,
): Promise<NextResponse<LoginResponseBody>> {
  // Task: Implement the user registration workflow

  // 1. Get the user data from the request
  const requestBody = await request.json();
  console.log('requestBody', requestBody);

  // 2. Validate User Data w zod
  const result = loginSchema.safeParse(requestBody);
  console.log('result', result);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  //3. verify user
  const userWithPasswordHash = await getUserWithPasswordHashInsecure(
    result.data.email,
  );
  console.log('userwpw', userWithPasswordHash);
  if (!userWithPasswordHash) {
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Username or Password is invalid',
          },
        ],
      },
      {
        status: 400,
      },
    );
  }
  console.log('result data', result.data.password);
  console.log('Fetched password hash:', userWithPasswordHash.password_hash);

  //4. Hash the password
  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  // 5. Save user info w/ passwordhash

  if (!isPasswordValid) {
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Username or Password is invalid',
          },
        ],
      },
      {
        status: 400,
      },
    );
  }

  return NextResponse.json({
    user: {
      email: userWithPasswordHash.email,
    },
  });
}
