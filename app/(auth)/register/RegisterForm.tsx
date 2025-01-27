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
        isAdmin: false,
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <SectionTitle title={'Want to become a Sorority member?'} />
        <Image
          src="/images/Register.png"
          style={{
            width: '100%',
            height: 'auto',
          }}
          width={600}
          height={325}
          alt="Mitglieder des Sorority-Vorstands"
        />

        <p>
          Nothing could be easier! The membership fee is a symbolic 30
          EUR/calendar year. As stated in our statutes, all women and
          individuals perceived as women can become members of The:Sorority.
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
                  strokeWidth="4"
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
            In addition to the financial support that makes our association's
            work possible, we are always looking for new dedicated individuals
            who want to volunteer in our network. You determine the time and
            scope of your involvement, of course. Currently, there are the
            following opportunities:
          </p>{' '}
          <p>
            As part of the Content Team, you can write exciting articles and
            reviews for our online channels or, in coordination with our Team
            Lead Marta, develop and implement new format ideas.
          </p>{' '}
          <p>
            Have you read an inspiring feminist book or discovered an intriguing
            podcast and want to share it with others? Then you're in the right
            place! Contact Marta directly at marta.suzama@sorority.at.
          </p>{' '}
          <p>
            Let’s be creative! As part of the Event Team, you'll help organize
            exciting events and workshops, meet interesting experts, and
            co-create get-togethers for our members. The Team Lead is Rika. And
            spoiler alert: Next year, we’re celebrating our 10th anniversary, so
            a particularly exciting event is coming up.
          </p>
          <p>
            Do you love organizing things, enjoy meeting new, fascinating
            people, and are open to learning? Then this could be a perfect match
            for you. Reach out to Rika directly at rika.mader@sorority.at. Let’s
            have fun!
          </p>
        </div>
      </div>
    </div>
    // </div>
  );
}
