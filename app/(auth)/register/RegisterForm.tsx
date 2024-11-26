'use client';

import { register } from 'module';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ErrorMessage from '../../(errormessage)/ErrorMessage';
import { getSafeReturnToPath } from '../../../util/validation';
import SectionTitle from '../../components/SectionTitle';
import buttonStyles from '../admin/dashboard/(components)/Buttons.module.scss';
import formStyles from '../admin/dashboard/AdminPage.module.scss';
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

    router.push(
      getSafeReturnToPath(props.returnTo) || `/profile/${data.user.firstName}`,
    );

    router.refresh();
  }

  // Render the form and other components
  return (
    // <div className={styles.main}>
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <SectionTitle title={'Du möchtest Sorority Mitglied werden?'} />
        <Image
          src="/images/Register.png"
          width={600}
          height={325}
          alt="Mitglieder des Sorority-Vorstands"
        />

        <p>
          Nichts leichter als das! Der Mitgliedsbeitag liegt bei symbolischen 30
          EUR/Kalenderjahr. Wie in unseren Statuten festgelegt, können alle
          Frauen und als Frauen gelesene Personen Mitglieder der Sorority
          werden.
        </p>

        <form onSubmit={handleRegister} className={styles.form}>
          <div className={styles.labelGroup}>
            <div className={formStyles.formItem}>
              <label className={formStyles.label}>
                First Name
                <input
                  className={styles.input}
                  value={firstName}
                  onChange={(event) => setFirstName(event.currentTarget.value)}
                />
              </label>
            </div>

            <div className={formStyles.formItem}>
              <label className={formStyles.label}>
                Last Name
                <input
                  className={styles.input}
                  value={lastName}
                  onChange={(event) => setLastName(event.currentTarget.value)}
                />
              </label>
            </div>

            <div className={formStyles.formItem}>
              {' '}
              <label className={formStyles.label}>
                Email
                <input
                  className={styles.input}
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.currentTarget.value)}
                />
              </label>
            </div>

            <div className={formStyles.formItem}>
              <label className={formStyles.label}>
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
            <div>Register</div>
          </button>

          {errors.map((error) => (
            <div className="error" key={`error-${error.message}`}>
              <ErrorMessage>{error.message}</ErrorMessage>
            </div>
          ))}
        </form>

        <div className={styles.organize}>
          <p>
            Neben der finanziellen Unterstützung, die unsere Vereinsarbeit erst
            ermöglicht, suchen wir immer wieder nach neuen engagierten Personen,
            die sich ehrenamtlich in unser Netzwerk einbringen wollen. Zeit und
            Umfang bestimmst dabei natürlich du. Aktuell gibt es hier folgende
            Möglichkeiten: Als Teil des Content Teams kannst du spannende
            Beiträge und Rezensionen für unsere Online-Kanäle schreiben oder in
            Absprache mit unserer Team Lead Marta neue Format-Ideen entwickeln
            und umsetzen.{' '}
          </p>{' '}
          <p>
            Du hast ein spannendes feministisches Buch gelesen oder einen
            Podcast entdeckt und möchtest andere daran teilhaben lassen? Dann
            bist du hier genau richtig! Melde dich direkt bei
            marta.suzama@sorority.at.{' '}
          </p>{' '}
          <p>
            Let’s be creative! Als Teil des Event Teams organisierst du
            spannende Events und Workshops mit, lernst interessante Expert:innen
            kennen und kannst Get Togethers für unsere Mitglieder mitgestalten.
            Team Lead ist Rika. Und Spoiler: Wir feiern kommendes Jahr unser
            10-jähriges Bestehen. Da kommt also ein besonders spannendes Event
            auf uns zu.{' '}
          </p>{' '}
          <p>
            Du liebst es Dinge zu organisieren, bist offen und lernst gern neue,
            spannende Leute kennen? Dann könnte das ein guter Match sein. Melde
            dich direkt bei rika.mader@sorority.at. Let’s have fun!
          </p>
        </div>
      </div>
    </div>
    // </div>
  );
}
