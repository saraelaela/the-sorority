'use client';

import { register } from 'module';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ErrorMessage from '../../(errormessage)/ErrorMessage';
import { getSafeReturnToPath } from '../../../util/validation';
import type { RegisterResponseBody } from '../api/register/route';
import styles from './register.module.scss';

type Props = { returnTo?: string | string[] };

export default function RegisterForm(props: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  // Fetch setup: sends information to the API
  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    const data: RegisterResponseBody = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(`/profile/${data.user.firstName}`);

    router.refresh();
  }

  // Render the form and other components
  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h3 className={styles.h3}>Du möchtest Sorority Mitglied werden?</h3>
          <p>
            Nichts leichter als das! Der Mitgliedsbeitag liegt bei symbolischen
            30 EUR/Kalenderjahr. Wie in unseren <mark>Statuten</mark>{' '}
            festgelegt, können alle Frauen und als Frauen gelesene Personen
            Mitglieder der Sorority werden.
          </p>
          <Image
            src="/images/Register.png"
            width={600}
            height={325}
            alt="Mitglieder des Sorority-Vorstands"
          />
          <form onSubmit={handleRegister} className={styles.registerForm}>
            <label className={styles.registerLabel}>
              First Name
              <input
                className={styles.inputLabel}
                value={firstName}
                onChange={(event) => setFirstName(event.currentTarget.value)}
              />
            </label>
            <label className={styles.registerLabel}>
              Last Name
              <input
                className={styles.inputLabel}
                value={lastName}
                onChange={(event) => setLastName(event.currentTarget.value)}
              />
            </label>
            <label className={styles.registerLabel}>
              Email
              <input
                className={styles.inputLabel}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </label>
            <label className={styles.registerLabel}>
              Password
              <input
                className={styles.inputLabel}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </label>
            <button>Register</button>

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
