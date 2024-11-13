import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createEventInsecure,
  type Event,
  getEventInsecure,
} from '../../../../database/events';
import { eventSchema } from '../../../../migrations/00002-createTableEvents';

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

  const newEvent = await createEventInsecure(
    result.data.eventTitle,
    result.data.eventDescription,
    result.data.eventLocation,
    result.data.eventDate,
    result.data.hostedBy,
    result.data.eventImage,
    result.data.eventCosts,
    result.data.createdBy,
  );
  console.log('newEvent:', newEvent);

  return NextResponse.json({ events: newEvent });
}

/////////////////////////////

type EventResponseBodyGet =
  | {
      events: Event[];
    }
  | {
      error: string;
    };

export async function GET(
  id: Event['id'],
): Promise<NextResponse<EventResponseBodyGet>> {
  const events = await getEventInsecure(id);

  console.log('is logging events:', events);
  return NextResponse.json({ events });
}
