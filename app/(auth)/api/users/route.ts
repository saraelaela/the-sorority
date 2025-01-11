import { NextResponse } from 'next/server';
import { type UpdateUser, type User } from '../../../../database/users';
import { updateUserSchema } from '../../../../migrations/00000-createTableUsers';
import { prisma } from '../../../../src/lib/db';

export type EditUserResponseBody =
  | {
      id: UpdateUser['id'];
      firstName: UpdateUser['firstName'];
      lastName: UpdateUser['lastName'];
      occupation?: UpdateUser['occupation'] | null;
      introText?: UpdateUser['introText'] | null;
      profilePicture?: UpdateUser['profilePicture'] | null;
      linkedin?: UpdateUser['linkedin'] | null;
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

  const updatedUser = await prisma.user.update({
    where: {
      id: result.data.id,
    },
    data: {
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      occupation: result.data.occupation ?? null,
      introText: result.data.introText ?? null,
      profilePicture: result.data.profilePicture ?? null,
      linkedin: result.data.linkedin ?? null,
    },
  });
  console.log('the updatedUser', updatedUser); //  Error: Property 'id' does not exist on type 'RowList<UpdateUser[]>'.

  // You need to access the rows within:

  const currentUser = await prisma.user.findUnique({
    where: {
      id: result.data.id,
    },
  });
  // const currentUser = updatedUser.find((user) => user.id === result.data.id);

  if (!currentUser) {
    return NextResponse.json(
      { errors: [{ message: 'Current user not found.' }] },
      { status: 404 },
    );
  }

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
    id: currentUser.id,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    occupation: currentUser.occupation || null,
    introText: currentUser.introText || null,
    profilePicture: currentUser.profilePicture || null,
    linkedin: currentUser.linkedin || null,
  });
}
