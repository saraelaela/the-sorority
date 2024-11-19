import React from 'react';
import styles from './Buttons.module.scss';

export default function EditEvents() {
  return (
    <>
      <button className={styles.editButton}>
        <div className={styles.icon}>✎</div>
        {/* <div>↪</div> */}
        <div>Edit Event</div>
      </button>
    </>
  );
}
