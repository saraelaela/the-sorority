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
            <Facebook
              link={'https://www.facebook.com/sorority.at/'}
              color={'black'}
              height={'10%'}
            />

            <Instagram
              link={
                'https://www.linkedin.com/company/sorority/?originalSubdomain=at'
              }
              color={'black'}
              height={'80%'}
            />
            <LinkedIn
              link={
                'https://www.linkedin.com/company/sorority/?originalSubdomain=at'
              }
              color={'black'}
              height={'90%'}
            />
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
