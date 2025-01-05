import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LogoutButton from '../../(auth)/logout/LogoutButton';
import type { User } from '../../../database/users';
import Facebook from '../Icons/Facebook';
import Instagram from '../Icons/Instagram';
import LinkedIn from '../Icons/LinkedIn';
import styles from './mobileMenue.module.scss';

type Props = {
  user: User | undefined;
  sessionTokenCookie: RequestCookie | undefined;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileMenue(props: Props) {
  const router = useRouter();

  return (
    <div className={styles.mobileMenue}>
      <div className={styles.header}>
        <div>The: Sorority</div>
        <button
          className={styles.button}
          onClick={() => {
            props.setMobileOpen(!props.mobileOpen);
          }}
        >
          {' '}
          <svg
            width="30"
            height="25"
            viewBox="0 0 20 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.026 1.24151L4.10081 13.3419" stroke="#6e28e3" />
            <path d="M4.33366 1.32129L15.6663 13.9783" stroke="#6e28e3" />
          </svg>
        </button>
      </div>
      <div className={styles.links}>
        <div className={styles.primarySection}>
          <div className={styles.item}>
            <svg
              width="33"
              height="28"
              viewBox="0 0 42 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 18.5H38M22.5 2L39 18.5L22.5 35"
                stroke="black"
                stroke-width="2"
              />
            </svg>
            <Link
              href="/"
              onClick={() => {
                props.setMobileOpen(!props.mobileOpen);
              }}
            >
              Home
            </Link>
          </div>
          <div className={styles.item}>
            <svg
              width="33"
              height="28"
              viewBox="0 0 42 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 18.5H38M22.5 2L39 18.5L22.5 35"
                stroke="black"
                stroke-width="2"
              />
            </svg>
            <Link
              href="/events"
              onClick={() => {
                props.setMobileOpen(!props.mobileOpen);
              }}
            >
              Events
            </Link>
          </div>
          <div className={styles.item}>
            <svg
              width="33"
              height="28"
              viewBox="0 0 42 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 18.5H38M22.5 2L39 18.5L22.5 35"
                stroke="black"
                stroke-width="2"
              />
            </svg>
            <Link
              href="/team"
              onClick={() => {
                props.setMobileOpen(!props.mobileOpen);
              }}
            >
              Team
            </Link>
          </div>
        </div>

        {props.user ? (
          props.user.isAdmin ? (
            <div className={styles.userArea}>
              <Link
                href="/admin/dashboard"
                onClick={() => {
                  props.setMobileOpen(!props.mobileOpen);
                }}
              >
                Dashboard
              </Link>
              <Link
                href={`/profile/${props.user.firstName}`}
                onClick={() => {
                  props.setMobileOpen(!props.mobileOpen);
                }}
              >
                My Account
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <div className={styles.userArea}>
              <Link
                href={`/profile/${props.user.firstName}`}
                onClick={() => {
                  props.setMobileOpen(!props.mobileOpen);
                }}
              >
                My Account
              </Link>

              <LogoutButton />
            </div>
          )
        ) : (
          <>
            <div className={styles.userArea}>
              <div className={styles.item}>
                +
                <Link
                  href="/register"
                  onClick={() => {
                    props.setMobileOpen(!props.mobileOpen);
                  }}
                >
                  Join Us
                </Link>
              </div>
            </div>
            <div className={styles.item}>
              ♡
              <Link
                href="/login"
                onClick={() => {
                  props.setMobileOpen(!props.mobileOpen);
                }}
              >
                Log-in
              </Link>
            </div>
          </>
        )}
      </div>

      <div className={styles.socialMedia}>
        <Facebook
          link={'https://www.facebook.com/sorority.at/'}
          color={'#6e28e3'}
          height={'10%'}
        />

        <Instagram
          link={
            'https://www.linkedin.com/company/sorority/?originalSubdomain=at'
          }
          color={'#6e28e3'}
          height={'80%'}
        />
        <LinkedIn
          link={
            'https://www.linkedin.com/company/sorority/?originalSubdomain=at'
          }
          color={' #6e28e3'}
          height={'90%'}
        />
      </div>
    </div>
  );
}
