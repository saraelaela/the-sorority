import Image from 'next/image';
import React from 'react';
import styles from '../page.module.scss';
import LinkedIn from './Icons/LinkedIn';

export default function UserCard(props: Props) {
  return (
    <div>
      {' '}
      <div key={props.value.id} className={styles.memberCard}>
        <Image
          src={props.value.profilePicture || '/images/image-placeholder.png'}
          width={280}
          height={280}
          alt="Mitglieder des Sorority-Vorstands"
        />
        <div className={styles.memberName}>
          <div> {props.value.firstName}</div> <div>{props.value.lastName}</div>
        </div>
        <div>{props.value.occupation}</div>

        {props.value.linkedin ? (
          <div className={styles.contact}>
            <LinkedIn
              height={'16'}
              color={'black'}
              link={props.value.linkedin}
            />{' '}
            <div>{props.value.email}</div>
          </div>
        ) : (
          <div className={styles.contact}>
            <div>{props.value.email}</div>
          </div>
        )}

        <p className={styles.memberIntro}>{props.value.introText}</p>
      </div>
    </div>
  );
}
