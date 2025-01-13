import Link from 'next/link';
import React from 'react';
import SectionTitle from '../components/SectionTitle';
import styles from './page.module.scss';

export default function page() {
  return (
    <div className={styles.temporaryWrapper}>
      <div className={styles.logoArea}>
        <div className={styles.animation}>
          <h1 className={styles.h1}> The: Beginning of something new</h1>
        </div>
      </div>

      <SectionTitle
        title={'Hey there! The Events-Page is currently under construction'}
      />
      <div className={styles.temporaryContainer}>
        <p>
          I'm currently working on a new database and trying out new features.{' '}
        </p>
        <p>
          If you're interested in my progress and are as excited as I am, check
          out{' '}
          <Link href="https://github.com/saraelaela" target="blank">
            <u>my Github</u>
          </Link>
          ! Under the-sorority Repo I made a new branch called blogfeature, feel
          free to check out what's new!
        </p>
        <p>
          If you have questions or Input, don't hesitate to contact me on{' '}
          <Link href="https://linkedin.com/in/sara-el-abed">
            <u>LinkedIn</u>
          </Link>
          . Looking forward hearing from you!
        </p>
      </div>
    </div>
  );
}

// 'use server';
// import { cookies } from 'next/headers';
// import Image from 'next/image';
// import Link from 'next/link';
// import { redirect } from 'next/navigation';
// import React, { useState } from 'react';
// import { getEventInsecure, getEventsInsecure } from '../../database/events';
// import { getValidSessionToken } from '../../database/sessions';
// import {
//   getUser,
//   getUserInsecure,
//   getUsersInsecure,
//   getUserWithPasswordHashInsecure,
// } from '../../database/users';
// import { userSchema } from '../../migrations/00000-createTableUsers';
// import type { Session } from '../../migrations/00004-sessions';
// import { getSafeReturnToPath } from '../../util/validation';
// import Footer from '../components/Footer';
// import DisplayEvents from './components/DisplayEvents';
// import EventOverview from './components/EventOverview';

// type Props = {
//   searchParams: Promise<{
//     returnTo?: string | string[];
//   }>;
// };

// export default async function EventsPage(props: Props) {
//   const events = await getEventsInsecure();
//   // 1) check if sessionToken exists
//   const sessionTokenCookie = (await cookies()).get('sessionToken');

//   //2. Check if sessionToken cookie is still valid
//   const session =
//     sessionTokenCookie &&
//     (await getValidSessionToken(sessionTokenCookie?.value));

//   // 3. if SessionToken cookie is Valid, redirect to home
//   // if (session) {
//   //   redirect(getSafeReturnToPath(returnTo) || '/');
//   // }

//   const user = session ? await getUser(session.token) : null;
//   console.log('userdata', user);
//   //1)  sessiontoken holen 2) Userdaten holen und als Props weitergeben, schauen, ob ID mitgeschickt wird

//   return (
//     <div>
//       <DisplayEvents session={session} events={events} user={user} />
//       {/* {user ? (
//         <DisplayEvents session={session} events={events} user={user} />
//       ) : (

//       )} */}

//       {/* <Footer customFooter="customFooterLogin" /> */}
//     </div>
//   );
// }
