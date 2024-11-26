import Image from 'next/image';
import Footer from './components/Footer';
import HomeComponent from './HomeComponent';
import styles from './page.module.scss';

export default async function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.logoArea}>
        <h1 className={styles.h1}>The: </h1>
        <div className={styles.animation}>
          <h1 className={styles.h1}>Sorority Sorority Sorority Sorority</h1>
        </div>
      </div>
      <div className={styles.secondaryContainer}>
        <div className={styles.footer}>
          {' '}
          <Footer customFooter="customFooterHome" customColor={'#BFFF50'} />
        </div>
        <div>
          {' '}
          <HomeComponent />
        </div>
      </div>
    </div>
  );
}
