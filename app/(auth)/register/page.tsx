import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionToken } from '../../../database/sessions';
import { getSafeReturnToPath } from '../../../util/validation';
import Footer from '../../components/Footer';
import styles from './page.module.scss';
import RegisterForm from './RegisterForm';

type Props = {
  searchParams: Promise<{
    returnTo?: string | string[];
  }>;
};

export default async function RegisterPage(props: Props) {
  const { returnTo } = await props.searchParams;

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

  // 4. If the sessionToken cookie is invalid or doesn't exist, show the register form:

  return (
    <div className={styles.main}>
      <div className={styles.logoArea}>
        <h1 className={styles.h1}>The: </h1>
        <div className={styles.animation}>
          <h1 className={styles.h1}>
            Sisterhood Sisterhood Sisterhood Sisterhood
          </h1>
        </div>
      </div>
      <div className={styles.secondaryContainer}>
        <div className={styles.footer}>
          <Footer customFooter="customFooterRegister" customColor={'#FFE3E9'} />
        </div>
        <div>
          <RegisterForm returnTo={returnTo} />
        </div>
      </div>
    </div>
  );
}
