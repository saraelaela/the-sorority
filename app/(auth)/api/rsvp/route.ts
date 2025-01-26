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
} from '../../../../migrations/00006-rsvp';

export type RsvpResponseBody =
  | {
      rsvp: {
        userId: CreateUserRsvp['userId'];
        eventId: CreateUserRsvp['eventId'];
        rsvpStatus: CreateUserRsvp['rsvpStatus'];
        createdAt: CreateUserRsvp['createdAt'];
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
    console.log('1. Raw request timestamp:', requestBody.createdAt);
  }

  const result = rsvpSchema.safeParse(requestBody);
  console.log(
    '2. After Zod parse timestamp:',
    result.success ? result.data.createdAt : 'parse failed',
  );

  {
  }

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
    result.data.createdAt,
  );

  console.log('3. Returned from DB timestamp:', newRsvp?.createdAt);

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
  return NextResponse.json({
    rsvp: newRsvp,
  });
}

// eslint-disable-next-line no-restricted-syntax
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const eventId = searchParams.get('eventId');

  // If userId is provided but no eventId, fetch all RSVPs for that user
  if (userId && !eventId) {
    const userIdNumber = parseInt(userId);
    if (isNaN(userIdNumber)) {
      return NextResponse.json(
        { error: 'Invalid user ID format' },
        { status: 400 },
      );
    }

    const allUserRsvps = await getAllUserRsvp(userIdNumber);
    return NextResponse.json({ allUserRsvps });
  }

  // If eventId is provided, use existing event-specific logic
  if (eventId) {
    const eventIdNumber = parseInt(eventId);
    if (isNaN(eventIdNumber)) {
      return NextResponse.json(
        { error: 'Invalid event ID format' },
        { status: 400 },
      );
    }

    const eventRsvps = await getAllEventRsvp(eventIdNumber);

    // If userId is also provided, get their RSVP status for this event
    if (userId) {
      const userIdNumber = parseInt(userId);
      if (isNaN(userIdNumber)) {
        return NextResponse.json(
          { error: 'Invalid user ID format' },
          { status: 400 },
        );
      }

      const loggedInUser = await getUserRsvp(userIdNumber, eventIdNumber);

      return NextResponse.json({
        rsvpState: loggedInUser.length > 0,
        eventRsvps,
      });
    }

    return NextResponse.json({
      rsvpState: null,
      eventRsvps,
    });
  }

  // If neither userId nor eventId is provided
  return NextResponse.json(
    { error: 'Either userId or eventId is required' },
    { status: 400 },
  );
}
