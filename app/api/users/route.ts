import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createUserInsecure,
  getUsersInsecure,
  type User,
} from '../../../database/users';

type UserResponseBodyGet =
  | {
      users: User;
    }
  | {
      error: string;
    };

export async function GET(): Promise<NextResponse<UserResponseBodyGet>> {
  const users = await getUsersInsecure();
  return NextResponse.json({ users: users }); // This is the endpoint
}

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
  role: z.string(), // Add the missing fields
  introText: z.string(),
  profilePicture: z.string().url(),
  createdAt: z.string(),
});

type UserResponseBodyPost =
  | {
      users: User;
    }
  | {
      error: string;
    };

export async function POST(
  request: Request,
): Promise<NextResponse<UserResponseBodyPost>> {
  const requestBody = await request.json();
  const result = userSchema.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'You need to send an Object or',
      },
      { status: 400 },
    );
  }

  const newUser = await createUserInsecure({
    username: result.data.username,
    password: result.data.password,
    email: result.data.email,
    role: result.data.role, // Pass the role
    introText: result.data.introText, // Pass the introText
    profilePicture: result.data.profilePicture, // Pass the profilePicture
    createdAt: result.data.createdAt, // Pass the createdAt
  });
  return NextResponse.json({ users: newUser });
}
