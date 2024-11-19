import React from 'react';
import styles from './Buttons.module.scss';

export default function CreateEvent() {
  return (
    <button className={styles.createButton}>
      <div>↪</div>
      <div>Create Event</div>
    </button>
  );
}
