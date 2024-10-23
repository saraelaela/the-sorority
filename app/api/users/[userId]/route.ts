import { NextRequest, NextResponse } from 'next/server';
// import { z } from 'zod';
import { getUserInsecure, type User } from '../../../../database/users';

type UserResponseBodyGet =
  | {
      user: User;
    }
  | {
      error: string;
    };

type UserParams = {
  params: {
    userId: string;
  };
};

//query directly in server component

export async function GET(
  request: NextRequest,
  { params }: UserParams,
): Promise<NextResponse<UserResponseBodyGet>> {
  console.log(params);
  const user = await getUserInsecure(Number(params.userId));

  if (!user) {
    return NextResponse.json(
      {
        error: 'Animal doesnt exist',
      },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json({ user: user });
}
