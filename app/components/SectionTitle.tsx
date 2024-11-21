import React from 'react';
import styles from '../page.module.css';

type Props = {
  title: string;
};

export default function SectionTitle(props: Props) {
  return (
    <>
      <div className={styles.sectionContainer}>
        <h1>{props.title}</h1>
      </div>
    </>
  );
}
