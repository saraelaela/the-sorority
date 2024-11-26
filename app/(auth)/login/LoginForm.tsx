'use client';

// import { login } from 'module';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ErrorMessage from '../../(errormessage)/ErrorMessage';
import { getSafeReturnToPath } from '../../../util/validation';
import SectionTitle from '../../components/SectionTitle';
import buttonStyles from '../admin/dashboard/(components)/Buttons.module.scss';
import type { LoginResponseBody } from '../api/login/route';
import styles from './login.module.scss';

type Props = { returnTo?: string | string[] };

export default function LoginForm(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  // Fetch setup: sends information to the API
  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data: LoginResponseBody = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(getSafeReturnToPath(props.returnTo) || `/admin/dashboard`);
    // router.push(`/profile/${data.user.firstName}`);
    router.refresh();
  }

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <Image
            src="/images/Register.png"
            width={600}
            height={325}
            alt="Mitglieder des Sorority-Vorstands"
          />
          <SectionTitle title={'Willkommen zurück, Sister!'} />
          {/* <p>Logge dich hier ein um an Events dabei zu sein!</p> */}

          <form className={styles.form} onSubmit={async (event) => await handleLogin(event)}>
            <div className={styles.labelGroup}>
              <div className={styles.formItem}>
                <label className={styles.label}>
                  Email
                  <input
                    className={styles.input}
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                  />
                </label>
              </div>
              <div className={styles.formItem}>
                <label className={styles.label}>
                  Password
                  <input
                    className={styles.input}
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                  />
                </label>
              </div>
            </div>
            <button className={buttonStyles.registerButton}>
              <div>
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
                    stroke-width="4"
                  />
                </svg>
              </div>
              <div>Login</div>
            </button>

            {errors.map((error) => (
              <div className="error" key={`error-${error.message}`}>
                <ErrorMessage>{error.message}</ErrorMessage>
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
}
