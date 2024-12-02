import React from 'react';
import styles from '../page.module.scss';

export type Props = {
  value: string;
};
export default function Tags(props: Props) {
  return <div className={styles.tag}>{props.value}</div>;
}
