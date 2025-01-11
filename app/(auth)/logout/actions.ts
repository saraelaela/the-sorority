'use server';

import { cookies } from 'next/headers';
// import { deleteSession } from '../../../database/sessions';
import { prisma } from '../../../src/lib/db';

export async function logout() {
  // Task: Implement the user logout workflow
  // 1. Get the session token from the cookie
  const cookieStore = await cookies();

  const token = cookieStore.get('sessionToken');

  if (token) {
    // 2. Delete the session from the database based on the token
    // await deleteSession(token.value);
    const deleteSession = await prisma.session.delete({
      where: {
        token: token.value,
      },
    });

    // 3. Delete the session cookie from the browser
    cookieStore.delete(token.name);

    // redirect('/');
  }

  return;
}
