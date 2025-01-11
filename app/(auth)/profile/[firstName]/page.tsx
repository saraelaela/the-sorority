import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '../../../../src/lib/db';
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
  const { returnTo, firstName } = await props.params;

  // 1) Get session token and validate
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  if (!sessionTokenCookie) {
    redirect(getSafeReturnToPath(returnTo) || '/');
  }

  // 2. Get session with user data
  const session = await prisma.session.findFirst({
    where: {
      token: sessionTokenCookie.value,
      expiryTimestamp: {
        gt: new Date(),
      },
    },
    include: {
      User: true, // Include full user data
    },
  });

  if (!session) {
    redirect(getSafeReturnToPath(returnTo) || '/');
  }

  // 3. Get user RSVPs
  const userRsvp = await prisma.rsvp.findMany({
    where: {
      userId: session.User.id, // Optionally filter by user
    },
    include: {
      Event: true, // Include event details if needed
    },
  });

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
          {session.User ? (
            <UserEventRsvp
              firstName={firstName}
              user={session.User}
              userRsvp={userRsvp}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}
