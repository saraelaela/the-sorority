'use client';

import { useRouter } from 'next/navigation';
import { logout } from './actions';

export default function LogoutButton() {
  const router = useRouter();
  console.log('component called');
  return (
    <form>
      <button
        className="logoutButton"
        formAction={async () => {
          await logout();
          router.refresh();
        }}
      >
        Logout
      </button>
    </form>
  );
}
