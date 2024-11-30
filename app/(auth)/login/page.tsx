import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionToken } from '../../../database/sessions';
import { getSafeReturnToPath } from '../../../util/validation';
import Footer from '../../components/Footer';
import LoginForm from './LoginForm';
import styles from './page.module.scss';

type Props = {
  searchParams: Promise<{
    returnTo?: string | string[];
  }>;
};

export default async function LoginPage(props: Props) {
  // 1) check if sessionToken exists
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  //2. Check if sessionToken cookie is still valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionToken(sessionTokenCookie?.value));

  // 3. if SessionToken cookie is Valid, redirect to home
  if (session) {
    redirect(getSafeReturnToPath(returnTo) || '/');
  }

  // 4. If the sessionToken cookie is invalid or doesn't exist, show the login form:
  return (
    <div className={styles.main}>
      <div className={styles.logoArea}>
        <h1 className={styles.h1}>The: </h1>
        <div className={styles.animation}>
          <h1 className={styles.h1}>Community Community Community Community</h1>
        </div>
      </div>
      <div className={styles.secondaryContainer}>
        <div className={styles.footer}>
          <Footer customFooter="customFooterLogin" customColor={'#E7E7E7'} />
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
