import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from '../page.module.scss';

type Props = {
  category: string;
  headline: string;
  bodyText: string;
  intro: string;
  published: Date;
  blogPostImage: string;
};

export default function BlogPostCard(props: Props) {
  const preview = props.bodyText.substring(0, 150);
  return (
    <div className={styles.blogPostCard}>
      <Image
        className={styles.image}
        src={props.blogPostImage}
        style={{
          width: '100%',
          height: 'auto',
        }}
        width={635}
        height={345}
        alt="Mitglieder des Sorority-Vorstands"
      />
      <div className={styles.blogPostText}>
        <h2>{props.headline}</h2>
        <div className={styles.subkategorie}>
          {' '}
          <h4>{props.category}</h4>
          <h4>{new Date(props.published).toLocaleDateString('de-DE')}</h4>
        </div>
        <p className={styles.blogPostDescription}>{preview} ...</p>
        <Link className={styles.link} href="/admin/dashboard">
          Read more
        </Link>
      </div>
    </div>
  );
}
