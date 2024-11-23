import { cookies } from 'next/headers';
import Image from 'next/image';
import { getEventsInsecure } from '../../../../database/events';
import { getAllRsvpInsecure, getUserRsvp } from '../../../../database/rsvp';
import { getValidSessionToken } from '../../../../database/sessions';
import { getUser, type User } from '../../../../database/users';
import type { Rsvp } from '../../../../migrations/00006-rsvp';
import Footer from '../../../components/Footer';
import UserEventRsvp from '../components/UserEventRsvp';
import styles from '../profile.module.scss';

type Props = {
  params: Promise<{
    firstName: string;
  }>;
  events: Event[];
  user: User;
  rsvp: Rsvp;
};

export default async function UserProfilePage(props: Props) {
  const { firstName } = await props.params;
  const events = await getEventsInsecure();
  // 1) check if sessionToken exists
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  //2. Check if sessionToken cookie is still valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionToken(sessionTokenCookie?.value));

  // 3. if SessionToken cookie is Valid, redirect to home
  // if (session) {
  //   redirect(getSafeReturnToPath(returnTo) || '/');
  // }
  const user = await getUser(session.token);
  const userRsvp = await getAllRsvpInsecure();
  console.log('getAllRsvpInsecure', userRsvp);
  //1)  sessiontoken holen 2) Userdaten holen und als Props weitergeben, schauen, ob ID mitgeschickt wird
  return (
    <>
      <div className={styles.main}>
        <div className={styles.logoArea}>
          <h1 className={styles.h1}>The: </h1>
          <div className={styles.animation}>
            <h1 className={styles.h1}>Sorority Sorority Sorority Sorority</h1>
          </div>
        </div>
        <UserEventRsvp events={events} user={user} userRsvp={userRsvp} />
        <Footer customFooter="customFooterUser" />
      </div>
    </>
  );
}
