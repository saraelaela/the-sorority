import React from 'react';
import styles from '../page.module.css';

export default function Tags(props: Props) {
  return <div className={styles.tag}>{props.value}</div>;
}
