import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  getEventInsecure,
  getEventsInsecure,
} from '../../../../database/events';
import { getUserRsvp } from '../../../../database/rsvp';
import { getValidSessionToken } from '../../../../database/sessions';
import { getUser, type User } from '../../../../database/users';
import { getSafeReturnToPath } from '../../../../util/validation';
import Footer from '../../../components/Footer';
import UserEventRsvp from '../components/UserEventRsvp';
import styles from '../profile.module.scss';

type Props = {
  params: Promise<{
    firstName: string;
    returnTo?: string | string[];
  }>;
};

export default async function UserProfilePage(props: Props) {
  const { returnTo } = await props.params;
  const { firstName } = await props.params;

  // 1) check if sessionToken exists
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  // 2. Check if sessionToken cookie is still valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionToken(sessionTokenCookie.value));

  if (!session) {
    // Redirect if session is invalid
    redirect(getSafeReturnToPath(returnTo) || '/');
  }

  const userWithPasswordHash = await getUser(session.token);

  if (!userWithPasswordHash) {
    redirect(getSafeReturnToPath(returnTo) || '/');
  }

  const user = await getUser(session.token);

  console.log('does the user exist:', user);

  // 1) sessiontoken holen 2) Userdaten holen und als Props weitergeben, schauen, ob ID mitgeschickt wird

  return (
    <div className={styles.main}>
      <div className={styles.logoArea}>
        <h1 className={styles.h1}>The: </h1>
        <div className={styles.animation}>
          <h1 className={styles.h1}>Sorority Sorority Sorority Sorority</h1>
        </div>
      </div>
      <div className={styles.secondaryContainer}>
        <div className={styles.footer}>
          <Footer customFooter="customFooterUser" customColor={'#000000'} />
        </div>
        <div>
          {user ? <UserEventRsvp firstName={firstName} user={user} /> : ''}
        </div>
      </div>
    </div>
  );
}
