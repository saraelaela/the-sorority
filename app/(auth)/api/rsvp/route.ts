import { NextResponse } from 'next/server';
import { createUserRsvp } from '../../../../database/rsvp';
import { type Rsvp } from '../../../../migrations/00006-rsvp';

export type RsvpResponseBody =
  | {
      rsvp: {
        userId: Rsvp['userId'];
        eventId: Rsvp['eventId'];
        rsvpStatus: Rsvp['rsvpStatus'];
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
  const result = await request.json();

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

  return NextResponse.json({
    rsvp: newRsvp,
  });
}
