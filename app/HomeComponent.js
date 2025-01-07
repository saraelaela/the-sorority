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
              style={{
                width: '100%',
                height: 'auto',
              }}
              width={635}
              height={345}
              alt="Mitglieder des Sorority-Vorstands"
            />
            <SectionTitle
              title={'The Network for Women and Those Perceived as Women'}
            />
            <p>
              The Sorority defines itself as an organization for cross-industry
              networking and labor market advancement for women and those
              perceived as women — regardless of age, (social) background,
              industry, or educational history — in Austria. The Sorority
              creates both analog and digital spaces for women and those
              perceived as women, enabling us to empower and support each other,
              exchange experiences and information on career and labor market
              topics, and learn from one another. To ensure our independence, we
              finance our infrastructure, offerings, and events exclusively
              through membership fees. Would you like to benefit from our events
              and support our work? Become a member today or leave us a small
              donation.
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
              <div> Check out our Events!</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
