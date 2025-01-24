import { NextResponse } from 'next/server';
import {
  createUserRsvp,
  getAllEventRsvp,
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
//   const userId = searchParams.get('userId');
//   const eventId = searchParams.get('eventId');

// if (!userId) {
//   return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
// }

// if (eventId) {
//   const loggedInUser = await getUserRsvp(parseInt(userId), parseInt(eventId));
//   const rsvpState = loggedInUser.length > 0;
//   const allEventRsvp = await getAllEventRsvp(parseInt(eventId));
//   return NextResponse.json({ rsvpState, allEventRsvp });
// } else {
//   const allUserRsvps = await getAllUserRsvp(parseInt(userId));
//   return NextResponse.json({ allUserRsvps });
// }

// }

// eslint-disable-next-line no-restricted-syntax
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const eventId = searchParams.get('eventId');

  // Parameter validation check
  if (!userId && !eventId) {
    return NextResponse.json(
      { error: 'Either userId or eventId is required' },
      { status: 400 },
    );
  }

  // Only userId provided
  if (userId && !eventId) {
    const userIdNumber = parseInt(userId);
    if (isNaN(userIdNumber)) {
      return NextResponse.json(
        { error: 'Invalid user ID format' },
        { status: 400 },
      );
    }

    const allUserRsvps = await getAllUserRsvp(userIdNumber).catch((error) => {
      console.error('Failed to fetch user RSVPs:', error);
      return NextResponse.json(
        { error: 'Unable to retrieve user RSVPs' },
        { status: 500 },
      );
    });

    if (allUserRsvps instanceof NextResponse) {
      return allUserRsvps; // Return error response if that's what we got
    }

    return NextResponse.json({ allUserRsvps });
  }

  // Only eventId provided
  if (!userId && eventId) {
    const eventIdNumber = parseInt(eventId);
    if (isNaN(eventIdNumber)) {
      return NextResponse.json(
        { error: 'Invalid event ID format' },
        { status: 400 },
      );
    }

    const eventRsvps = await getAllEventRsvp(eventIdNumber).catch((error) => {
      console.error('Failed to fetch event RSVPs:', error);
      return NextResponse.json(
        { error: 'Unable to retrieve event RSVPs' },
        { status: 500 },
      );
    });

    if (eventRsvps instanceof NextResponse) {
      return eventRsvps;
    }

    return NextResponse.json({ eventRsvps });
  }

  // userId and eventId provided
  if (userId && eventId) {
    const userIdNumber = parseInt(userId);
    const eventIdNumber = parseInt(eventId);

    if (isNaN(userIdNumber) || isNaN(eventIdNumber)) {
      return NextResponse.json(
        { error: 'Invalid ID format provided' },
        { status: 400 },
      );
    }

    const loggedInUser = await getUserRsvp(userIdNumber, eventIdNumber).catch(
      (error) => {
        console.error('Failed to fetch user RSVP status:', error);
        return NextResponse.json(
          { error: 'Unable to retrieve RSVP status' },
          { status: 500 },
        );
      },
    );

    if (loggedInUser instanceof NextResponse) {
      return loggedInUser;
    }

    const eventRsvps = await getAllEventRsvp(eventIdNumber).catch((error) => {
      console.error('Failed to fetch event RSVPs:', error);
      return NextResponse.json(
        { error: 'Unable to retrieve event RSVPs' },
        { status: 500 },
      );
    });

    if (eventRsvps instanceof NextResponse) {
      return eventRsvps;
    }

    return NextResponse.json({
      rsvpState: loggedInUser.length > 0,
      eventRsvps,
    });
  }
}
