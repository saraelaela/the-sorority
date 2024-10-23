import { NextResponse } from 'next/server';
import { getUsersInsecure } from '../../../database/users';

type RootResponseBodyGet =
  | {
      users: string;
    }
  | {
      error: string;
    };

export async function GET(): Promise<NextResponse<RootResponseBodyGet>> {
  const users = await getUsersInsecure();
  return NextResponse.json({ users: users }); // This is the endpoint
}
