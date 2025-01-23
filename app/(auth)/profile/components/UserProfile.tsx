'use client';
import React, { useState } from 'react';
import buttonStyles from '../../../(auth)/admin/dashboard/(components)/Buttons.module.scss';
import type { User } from '../../../../database/users';
import UserCard from '../../../components/UserCard';
import styles from '../profile.module.scss';
import UserForm from './UserForm';

type Props = {
  firstName: string;
  user: User;
};

export default function UserProfile(props: Props) {
  const [showUserForm, setShowUserForm] = useState(false);
  console.log('PROPS USER', props.user);
  return (
    <div className={styles.editUser}>
      {showUserForm ? (
        <UserForm
          setShowUserForm={setShowUserForm}
          firstName={props.firstName}
          user={props.user}
        />
      ) : (
        <>
          <UserCard value={props.user} />

          <button
            className={buttonStyles.editProfileButton}
            onClick={() => {
              setShowUserForm(true);
            }}
          >
            <div className={buttonStyles.icon}>✎</div>{' '}
            <div className={buttonStyles.value}>Edit</div>
          </button>
        </>
      )}
    </div>
  );
}
