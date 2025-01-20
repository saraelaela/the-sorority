import React, { useState } from 'react';
import type { Event } from '../../../../../database/events';
import styles from './Buttons.module.scss';

type Props = {
  event: Event;
  setShowForm: (Status: boolean) => void;
  showForm: boolean;
  setSelectedEvent: (event: Event) => void;
};

export default function EditEvents(props: Props) {
  return (
    <button
      className={styles.editButton}
      onClick={() => {
        props.setShowForm(true);
        props.setSelectedEvent(props.event);
      }}
    >
      <div className={styles.icon}>✎</div>
      {/* <div>↪</div> */}
      <div>Edit Event</div>
    </button>
  );
}
