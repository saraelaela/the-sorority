import { NextResponse } from 'next/server';
import { updateUsersInsecure } from '../../../../database/users';
import {
  updateUserSchema,
  type User,
  userSchema,
} from '../../../../migrations/00000-createTableUsers';

export type EditUserResponseBody =
  | {
      id: User['id'];
      firstName: User['firstName'];
      lastName: User['lastName'];
      occupation?: User['occupation'];
      introText?: User['introText'];
      profilePicture?: User['profilePicture'];
      linkedIn?: User['linkedIn'];
    }
  | {
      errors: { message: string }[];
    };

export async function PUT(
  request: Request,
): Promise<NextResponse<EditUserResponseBody>> {
  // Task: Implement the user login workflow

  console.log('hello world');

  // 1. Get the user data from the request
  const requestBody = await request.json();
  console.log('error requestBody', JSON.stringify(requestBody));
  // 2. Validate the user data with zod
  const result = updateUserSchema.safeParse(requestBody);
  console.log('errorlog', JSON.stringify(result));

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  const updatedUser = await updateUsersInsecure(
    result.data.id,
    result.data.firstName,
    result.data.lastName,
    result.data.occupation,
    result.data.introText,
    result.data.profilePicture,
    result.data.linkedIn,
  );
  if (!updatedUser) {
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Update failed',
          },
        ],
      },
      {
        status: 400,
      },
    );
  }

  return NextResponse.json({
    updatedUser: updatedUser,
  });
}
