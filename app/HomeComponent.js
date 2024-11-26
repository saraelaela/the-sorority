'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import buttonStyles from '../app/(auth)/admin/dashboard/(components)/Buttons.module.scss';
import SectionTitle from './components/SectionTitle';
import styles from './homeComponent.module.scss';

export default function HomeComponent() {
  const router = useRouter();
  return (
    <>
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <Image
              src="/images/Register.png"
              width={635}
              height={345}
              alt="Mitglieder des Sorority-Vorstands"
            />
            <SectionTitle
              title={'Das Netzwerk für Frauen und als Frauen gelesene Personen'}
            />
            <p>
              Die Sorority versteht sich als Verein zur branchenübergreifenden
              Vernetzung und arbeitsmarktpolitischen Förderung von Frauen und
              als Frauen gelesenen Personen – unabhängig von Alter, (sozialer)
              Herkunft, Branche und Bildungshintergrund – in Österreich.
            </p>
            <p>
              Die Sorority schafft analoge und digitale Räume für Frauen und als
              Frauen gelesene Personen, um uns gegenseitig zu stärken und zu
              unterstützen, Erfahrungen und Informationen rund um Berufs- und
              Arbeitsmarktthemen auszutauschen und voneinander zu lernen. Um
              unsere Unabhängigkeit sicherzustellen finanzieren wir unsere
              Infrastruktur, unsere Angebote und Formate ausschließlich über
              Mitgliedsbeiträge. Du möchtest ebenfalls unsere Formate nutzen und
              unsere Vereinsarbeit unterstützen? Dann werde direkt Mitglied oder
              lass uns eine kleine Spende da.
            </p>
            <button
              className={buttonStyles.exploreButton}
              onClick={() => {
                router.push('/events');
              }}
            >
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
              <div> Entdecke unsere Events!</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
