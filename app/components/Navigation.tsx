'use client';
import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import Link from 'next/link';
import { useState } from 'react';
import LogoutButton from '../(auth)/logout/LogoutButton';
import type { User } from '../../database/users';
import styles from '../page.module.scss';
import MobileMenue from './mobile/MobileMenue';

type Props = {
  user: User | undefined;
  sessionTokenCookie: RequestCookie | undefined;
};

export default function Navigation(props: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      <div className={styles.navbarDesktop}>
        <Link href="/">Home</Link>
        {/* <Link href="/events">Events</Link> */}
        <Link href="/team">Team</Link>
        <Link href="/magazine">Magazin</Link>
        {props.user ? (
          props.user.isAdmin ? (
            <div className={styles.userArea}>
              <Link href="/admin/dashboard">Dashboard</Link>
              <Link href={`/profile/${props.user.firstName}`}>My Account</Link>
              <LogoutButton />
            </div>
          ) : (
            <div className={styles.userArea}>
              <Link href={`/profile/${props.user.firstName}`}>My Account</Link>

              <LogoutButton />
            </div>
          )
        ) : (
          <div className={styles.userArea}>
            <Link href="/register">Join Us</Link>
            <Link href="/login">Log-in</Link>
          </div>
        )}
      </div>

      <div className={styles.navbarMobile}>
        <div>The Sorority</div>
        <button className={styles.button} onClick={() => setMobileOpen(true)}>
          {' '}
          <svg
            width="35"
            height="17"
            viewBox="0 0 35 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line y1="0.5" x2="35" y2="0.5" stroke="black" />
            <line y1="8.5" x2="35" y2="8.5" stroke="black" />
            <line y1="16.5" x2="35" y2="16.5" stroke="black" />
          </svg>{' '}
        </button>
        {mobileOpen && (
          <MobileMenue
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            user={props.user}
            sessionTokenCookie={props.sessionTokenCookie}
          />
        )}
      </div>
    </>
  );
}
