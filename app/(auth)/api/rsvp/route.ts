import { NextResponse } from 'next/server';
import {
  createUserRsvp,
  getAllUserRsvp,
  getUserRsvp,
} from '../../../../database/rsvp';
import {
  type CreateUserRsvp,
  rsvpSchema,
  type UserRsvp,
} from '../../../../migrations/00006-rsvp';

export type RsvpResponseBody =
  | {
      rsvp: {
        userId: CreateUserRsvp['userId'];
        eventId: CreateUserRsvp['eventId'];
        rsvpStatus: CreateUserRsvp['rsvpStatus'];
      };
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: Request,
): Promise<NextResponse<RsvpResponseBody>> {
  // Task: Implement the user login workflow

  // 1. Get the user data from the request
  const requestBody = await request.json();
  {
    console.log('datacheck', requestBody);
  }

  const result = rsvpSchema.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  const newRsvp = await createUserRsvp(
    result.data.userId,
    result.data.eventId,
    result.data.rsvpStatus,
  );
  if (!newRsvp) {
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Rsvp failed',
          },
        ],
      },
      {
        status: 400,
      },
    );
  }
  console.log('newRsvp', newRsvp);
  return NextResponse.json({
    rsvp: newRsvp,
  });
}

// eslint-disable-next-line no-restricted-syntax
// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const eventId = searchParams.get('eventId');

//   if (!eventId) {
//     return NextResponse.json(
//       { error: 'Event ID is required' },
//       { status: 400 },
//     );
//   }

//   const attendees = await getUserRsvp(parseInt(eventId));
//   return NextResponse.json(attendees);
// }

// eslint-disable-next-line no-restricted-syntax
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const eventId = searchParams.get('eventId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  if (eventId) {
    const loggedInUser = await getUserRsvp(parseInt(userId), parseInt(eventId));
    const rsvpState = loggedInUser.length > 0;
    return NextResponse.json({ rsvpState });
  } else {
    const allUserRsvps = await getAllUserRsvp(parseInt(userId));
    return NextResponse.json({ allUserRsvps });
  }
}
