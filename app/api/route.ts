import { NextResponse } from 'next/server';

type RootResponseBodyGet = {
  users: string;
};

export function GET(): NextResponse<RootResponseBodyGet> {
  return NextResponse.json({ users: '/api/users' }); // This is the endpoint
}
