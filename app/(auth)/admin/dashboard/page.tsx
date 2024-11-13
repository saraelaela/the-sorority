import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionToken } from '../../../../database/sessions';
import { getUser, getUsersInsecure } from '../../../../database/users';
import AdminForm from './AdminForm';

// import AdminForm from './AdminForm';

export const metadata = {
  title: 'Admin page',
  description: 'Solidarity Admin',
};

export default async function AdminPage() {
  //1. Cookie exist
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  //2. sessionToken still valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionToken(sessionTokenCookie.value));

  //3.
  if (!session) {
    redirect('/login?returnTo=/admin/dashboard');
  }

  const user = sessionTokenCookie && (await getUser(sessionTokenCookie?.value));

  return (
    <div>
      <AdminForm />
      {/* <AdminForm user={user} /> */}
    </div>
  );
}
