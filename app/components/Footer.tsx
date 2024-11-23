import Link from 'next/link';
import React from 'react';
import styles from './footerStyle.module.scss';
import Facebook from './Icons/Facebook';
import Instagram from './Icons/Instagram';
import LinkedIn from './Icons/LinkedIn';

export default function Footer(props) {
  return (
    <footer className={styles[props.customFooter]}>
      <div className={styles.footerContainer}>
        <div className={styles.footerWrapper}>
          <div className={styles.socialMedia}>
            <Link href={'https://www.facebook.com/sorority.at/'}>
              {' '}
              <Facebook />
              {/* <a href="https://www.facebook.com/sorority.at/">
              <Facebook />
            </a> */}
            </Link>
            <Instagram />
            <LinkedIn />
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
