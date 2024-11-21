'use client';

// import { login } from 'module';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ErrorMessage from '../../(errormessage)/ErrorMessage';
import { getSafeReturnToPath } from '../../../util/validation';
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
          <h3 className={styles.h3}>Willkommen zurück!</h3>
          <p>Logge dich hier ein um an Events dabei zu sein!</p>

          <form onSubmit={async (event) => await handleLogin(event)}>
            <label className={styles.loginLabel}>
              Email
              <input
                className={styles.inputLabel}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </label>

            <label className={styles.loginLabel}>
              Password
              <input
                className={styles.inputLabel}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </label>
            <button>Login</button>

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
