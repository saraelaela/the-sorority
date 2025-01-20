'use client';

import { useRouter } from 'next/navigation';
import styles from '../admin/dashboard/(components)/Buttons.module.scss';
import { logout } from './actions';

export default function LogoutButton() {
  const router = useRouter();

  return (
    <form className={styles.form}>
      <div className={styles.test}>
        <button
          className={styles.logoutButton}
          formAction={async () => {
            await logout();
            router.refresh();
          }}
        >
          <div className={styles.logoutButtonIcon}>
            <svg
              width="10.5"
              height="9"
              viewBox="0 0 42 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 18.5H38M22.5 2L39 18.5L22.5 35"
                stroke="black"
                strokeWidth="4"
              />
            </svg>
          </div>
          <div className={styles.logoutButtonItem}>Logout</div>
        </button>
      </div>
    </form>
  );
}
