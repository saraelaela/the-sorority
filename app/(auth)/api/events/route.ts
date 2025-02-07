import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  createEventInsecure,
  deleteEventInsecure,
  type Event,
  type UpdateEvent,
  updateEventInsecure,
} from '../../../../database/events';
import {
  eventSchema,
  updateEventSchema,
} from '../../../../migrations/00002-createTableEvents';

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

  const newEvent = await createEventInsecure(
    result.data.eventTitle,
    result.data.eventDescription,
    result.data.eventLocation,
    result.data.eventDate,
    result.data.hostedBy,
    result.data.eventImage ?? '',
    result.data.eventCosts,
  );

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
  const deletedEvent = await deleteEventInsecure(id); // geht zur Datenbank und löscht das event //nimm query und führe sie durch mit Value von ID
  console.log('deletedEvent', deletedEvent);
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
