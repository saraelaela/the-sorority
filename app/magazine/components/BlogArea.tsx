import React from 'react';
import styles from '../page.module.scss';
import BlogPostCard from './BlogPostCard';
import BlogPostText from './BlogPostText';

export default function BlogArea() {
  return (
    <div className={styles.blogAreaWrapper}>
      {' '}
      <div className={styles.info}>
        {' '}
        <div>
          <p>
            Im Magazin findest du Beiträge zu unseren Events, zu unseren
            Hero:ines, Empfehlungen zur Literatur und Kultur. Es ist auch der
            Ort, an dem wir zu aktuellen Themen Stellung nehmen und Sisters
            schreiben lassen wollen.
          </p>
        </div>
        <div>
          <p>
            Möchtest auch du einen Beitrag für die Community schreiben? Oder
            gibt es ein Thema, das dir am Herz liegt und du hier lesen möchtest?
            Melde dich bei uns: content@sorority.com{' '}
          </p>
        </div>
      </div>
      <div className={styles.blogArea}>
        <BlogPostCard />
      </div>
    </div>
  );
}
