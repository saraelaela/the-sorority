import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from '../(auth)/admin/dashboard/(components)/Buttons.module.scss';
import type { RsvpResponseBody } from '../(auth)/api/rsvp/route';
import type { User } from '../../database/users';

type Props = {
  url: string;
  icon: React.ReactNode;
  value: string;
};

export default function Button(props: Props) {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => {
          router.push(`${props.url}`);
        }}
        className={styles.regularButton}
      >
        <div>{props.icon}</div>
        <div>{props.value}</div>
      </button>
    </div>
  );
}
