import React from 'react';
import styles from './footerStyle.module.scss';

export default function Footer(props) {
  return (
    <footer className={styles[props.customFooter]}>
      <div className={styles.footerContainer}>
        <div className={styles.footerWrapper}>
          <div className={styles.socialMedia}>
            <div>Icon1 </div>
            <div>Icon2</div>
            <div>Icon3</div>
          </div>
          <div className={styles.footerEssentials}>
            <div>Newsletter</div>
            <div>Imprint</div>
            <div>Data</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
