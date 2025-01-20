import { NextResponse } from 'next/server';
import {
  updateEventInsecure,
  type UpdateEvent,
} from '../../../../../database/events';
import { updateEventSchema } from '../../../../../migrations/00002-createTableEvents';

type EventResponseUpdate =
  | UpdateEvent
  | { error: string }
  | { errors: { message: string }[] };

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse<EventResponseUpdate>> {
  const requestBody = await request.json();
  const bodyWithId = {
    ...requestBody,
    id: parseInt(params.id, 10), // Convert string ID to number if needed
  };

  const result = updateEventSchema.safeParse(bodyWithId);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  const updatedEvent = await updateEventInsecure(
    result.data.id,
    result.data.eventTitle,
    result.data.eventDescription,
    result.data.eventLocation || null,
    result.data.eventDate || null,
    result.data.hostedBy || null,
    result.data.eventImage || null,
    result.data.eventCosts || null,
  );

  const currentEvent = updatedEvent.find(
    (event) => event.id === result.data.id,
  );

  if (!currentEvent) {
    return NextResponse.json(
      { errors: [{ message: 'Current user not found.' }] },
      { status: 404 },
    );
  }

  return NextResponse.json({
    id: currentEvent.id,
    eventTitle: currentEvent.eventTitle,
    eventDescription: currentEvent.eventDescription,
    eventLocation: currentEvent.eventLocation,
    eventDate: currentEvent.eventDate,
    hostedBy: currentEvent.hostedBy,
    eventImage: currentEvent.eventImage,
    eventCosts: currentEvent.eventCosts,
  });
}
