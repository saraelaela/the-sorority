import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { type Event } from '../../../../database/events';
import { eventSchema } from '../../../../migrations/00002-createTableEvents';
import { prisma } from '../../../../src/lib/db';

//1) defining typescript type:
export type EventResponseBody =
  | {
      event: {
        eventTitle: Event['eventTitle'];
        eventDescription: Event['eventDescription'];
        eventLocation: Event['eventLocation'];
        eventDate: Event['eventDate'];
        hostedBy: Event['hostedBy'];
        eventImage: Event['eventImage'];
        eventCosts: Event['eventCosts'];
        createdBy: Event['createdBy'];
      };
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: Request,
): Promise<NextResponse<EventResponseBody>> {
  // 1. Get the event data from the request
  const requestBody = await request.json();

  // 2. validate w/zod
  const result = eventSchema.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  const newEvent = await prisma.event.create({
    data: {
      eventTitle: result.data.eventTitle,
      eventDescription: result.data.eventDescription,
      eventLocation: result.data.eventLocation,
      eventDate: result.data.eventDate,
      hostedBy: result.data.hostedBy,
      eventImage: result.data.eventImage,
      eventCosts: result.data.eventCosts,
      createdBy: result.data.createdBy,
    },
  });

  if (!newEvent) {
    return NextResponse.json(
      {
        errors: [{ message: 'Invalid event data provided.' }],
      },
      {
        status: 400,
      },
    );
  }

  return NextResponse.json({ event: newEvent });
}

export type EventResponseBodyDelete =
  | {
      event: {
        eventId: Event['id'];
      };
    }
  | {
      error: string;
    };

export async function DELETE(
  request: NextRequest,
): Promise<NextResponse<EventResponseBodyDelete>> {
  // deconstructing body // { id: props.eventId } ->  request.json()
  // const body = await request.json();
  // const id = body.id  /// werden in einem step vereint

  const { id } = await request.json(); // Extract eventId from the body

  //ist ID vohanden
  if (!id) {
    return NextResponse.json(
      { error: 'Event ID is required' }, // Matches `error` as string in the type
      { status: 400 }, // Bad Request
    );
  }

  const sessionToken = (await cookies()).get('sessionToken')?.value;

  //kreirt eine variable für returnvalue der Datenbankabfrage
  // const deletedEvent = await deleteEventInsecure(id);

  const deletedEvent = await prisma.event.delete({
    where: {
      id: id,
    },
  });

  // geht zur Datenbank und löscht das event //nimm query und führe sie durch mit Value von ID

  if (!deletedEvent) {
    return NextResponse.json(
      {
        error: 'Event not found',
      },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json(
    { event: { eventId: deletedEvent.id } }, // Ensures response matches the type
    { status: 200 }, // OK
  );
}

// export async function PUT(
//   request: NextRequest,
//   { params }: UserParams,
// ): Promise<NextResponse<UserResponseBodyPut>> {
//   const requestBody = await request.json();

//   const result = userSchema.safeParse(requestBody);

//   if (!result.success) {
//     return NextResponse.json(
//       {
//         error: "Request doesn't contain user object",
//         errorIssues: result.error.issues,
//       },
//       {
//         status: 400,
//       },
//     );
//   }

//   const sessionTokenCookie = (await cookies()).get('sessionToken');

//   const updatedUser =
//     sessionTokenCookie &&
//     (await updateUserInsecure(sessionTokenCookie.value, {
//       firstName: result.data.firstName,
//       lastName: result.data.lastName,
//       occupation: result.data.occupation || null,
//       introText: result.data.introText || null,
//       profilePicture: result.data.profilePicture || null,
//       linkedin: result.data.linkedin || null,
//     }));

//   if (!updatedUser) {
//     return NextResponse.json(
//       {
//         error: 'User not found or access denied updating user',
//       },
//       {
//         status: 500,
//       },
//     );
//   }

//   return NextResponse.json({
//     user: updatedUser,
//   });
// }
