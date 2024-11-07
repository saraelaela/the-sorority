// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';
// import { getValidSessionToken } from '../../../database/sessions';
// import { getSafeReturnToPath } from '../../../util/validation';
import LoginForm from './LoginForm';
import styles from './page.module.scss';

type Props = {
  searchParams: Promise<{
    returnTo?: string | string[];
  }>;
};

export default async function LoginPage(props: Props) {
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
      <LoginForm />
    </div>
  );
}
