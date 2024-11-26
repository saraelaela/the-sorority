'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import type { User } from '../../../../database/users';
import { getSafeReturnToPath } from '../../../../util/validation';
import UserCard from '../../../components/UserCard';
import styles from '../profile.module.scss';
import UserForm from './UserForm';

type Props = {
  user: User;
  firstName: string;
};

export default function UserProfile(props: Props) {
  const [showUserForm, setShowUserForm] = useState(false);
  console.log('user props being passed to UserProfile', props.user);

  return (
    <div className={styles.editUser}>
      {/* <button onClick={() => setShowUserForm(false)}>save update</button> */}
      {showUserForm ? (
        <>
          <UserForm
            setShowUserForm={setShowUserForm}
            firstName={props.firstName}
            user={props.user}
          />
        </>
      ) : (
        <>
          <UserCard value={props.user} />
          <button
            onClick={() => {
              setShowUserForm(true);
            }}
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
}
