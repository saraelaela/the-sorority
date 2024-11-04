import Image from 'next/image';
import styles from './homeComponent.module.scss';

export default function HomeComponent() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <h2>Willkommen bei der Sorority</h2>
            <p>
              Nichts leichter als das! Der Mitgliedsbeitag liegt bei
              symbolischen 30 EUR/Kalenderjahr. Wie in unseren{' '}
              <mark>Statuten</mark> festgelegt, können alle Frauen und als
              Frauen gelesene Personen Mitglieder der Sorority werden.
            </p>
            <Image
              src="/images/Register.png"
              width={600}
              height={325}
              alt="Mitglieder des Sorority-Vorstands"
            />
          </div>
        </div>
      </div>
    </>
  );
}
