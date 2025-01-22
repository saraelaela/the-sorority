import Link from 'next/link';
import React from 'react';
import styles from '../page.module.scss';

type Props = {
  category: string;
  headline: string;
  bodyText: string;
  intro: string;
  published: Date;
};

export default function BlogPostText(props: Props) {
  return (
    <div className={styles.blogPostTextWrapper}>
      <div className={styles.subkategorie}>
        <h4>{props.category}</h4>
        <h4>{new Date(props.published).toLocaleDateString('de-DE')}</h4>
      </div>
      <h2 className={styles.blogPostHeadline}>{props.headline}</h2>
      <Link className={styles.link} href="/admin/dashboard">
        Read more
      </Link>
    </div>
  );
}
