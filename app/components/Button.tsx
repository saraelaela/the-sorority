import React, { useEffect, useState } from 'react';
import type { RsvpResponseBody } from '../(auth)/api/rsvp/route';
import type { User } from '../../database/users';
import styles from '../page.module.css';

// type Props = {
//   event: Event[];
//   user: User | undefined;
//   userId: number;
//   eventDetails: number;
// };

export default function Button() {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button}>
        <div>{props.icon}</div>
        <div>{props.value}</div>
      </button>
    </div>
  );
}
