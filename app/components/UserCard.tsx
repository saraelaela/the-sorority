import Image from 'next/image';
import React from 'react';
import styles from '../page.module.css';

export default function UserCard(props: Props) {
  console.log('props user being passed to User Card', props.value);
  return (
    <div>
      {' '}
      <div key={props.value.id} className={styles.teamCard}>
        <Image
          src={`/images/board/${props.value.firstName}.jpg`}
          width={280}
          height={280}
          alt="Mitglieder des Sorority-Vorstands"
        />
        <div className={styles.teamMemberName}>
          {props.value.firstName}
          {props.value.lastName}
        </div>
        <div>{props.value.occupation}</div>
        <div className={styles.contact}>
          <div>{props.value.linkedIn}</div>
          <div>{props.value.email}</div>
        </div>
        <p className={styles.teamMemberIntro}>{props.value.intro}</p>
      </div>
    </div>
  );
}
