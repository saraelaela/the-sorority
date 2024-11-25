import React from 'react';
import Footer from '../components/Footer';
import TeamComponent from './components/TeamComponent';
import styles from './team.module.scss';

export default function page() {
  return (
    <div className={styles.main}>
      <div className={styles.logoArea}>
        <h1 className={styles.h1}>The: </h1>
        <div className={styles.animation}>
          <h1 className={styles.h1}>Squad Squad Squad Squad</h1>
        </div>
      </div>
      <div className={styles.secondaryContainer}>
        <div className={styles.footer}>
          <Footer customFooter="customFooterTeam" customColor={'#F2AF00'} />
        </div>
        <div>
          {' '}
          <TeamComponent />
        </div>
      </div>
    </div>
  );
}
