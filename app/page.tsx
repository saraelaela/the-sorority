import Image from 'next/image';
// import FooterDynamic from './FooterDynamic'; // Import FooterDynamic component
import HomeComponent from './HomeComponent';
import RootLayout from './layout';
import styles from './page.module.css';

export default async function Home() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.logoArea}>
          <h1 className={styles.h1}>The: </h1>
          <h1 className={styles.h1}>Sorority </h1>
        </div>
        <HomeComponent />
      </div>
    </>
  );
}
