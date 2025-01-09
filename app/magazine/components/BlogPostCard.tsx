import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from '../page.module.scss';

export default function BlogPostCard() {
  const imageUrl = '/images/Register.png';
  return (
    <>
      {imageUrl ? (
        <div className={styles.blogPostCard}>
          <Image
            src={imageUrl}
            style={{
              width: '100%',
              height: 'auto',
            }}
            width={635}
            height={345}
            alt="Mitglieder des Sorority-Vorstands"
          />
          <div className={styles.blogPostText}>
            <h2>Heimat bist du toter töchter</h2>
            <div className={styles.subkategorie}>
              {' '}
              <h4>Subkategorie</h4> <h4>Datum</h4>
            </div>
            <p className={styles.blogPostDescription}>
              *Triggerwarnung: Das besprochene Buch handelt von Frauenmorde.
              Dies kann für Lesende verstörend sein. Geschrieben von Monika
              Dauterive “Warum...
            </p>
            <Link className={styles.link} href="/admin/dashboard">
              Read more
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.blogPostTextWrapper}>
          <h2 className={styles.blogPostHeadline}>
            Wir sind viele: Die neuen Vorstand-innen* der Sorority
          </h2>
        </div>
      )}
    </>
  );
}
