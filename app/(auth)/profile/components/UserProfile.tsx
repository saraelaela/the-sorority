'use client';
import React, { useState } from 'react';
import UserCard from '../../../components/UserCard';
import styles from '../profile.module.scss';
import UserForm from './UserForm';

export default function UserProfile(props: Props) {
  const [showUserForm, setShowUserForm] = useState(false);
  console.log('user props being passed to UserProfile', props.user);
  return (
    <div className={styles.editUser}>
      <UserForm user={props.user} />
      {/* <button onClick={() => setShowUserForm(false)}>save update</button> */}
      {/* {showUserForm ? (
        <>
          <UserForm user={props.user} />
          <button onClick={() => setShowUserForm(false)}>save update</button>
        </>
      ) : (
        <>
          <UserCard value={props.user} />
          <button onClick={() => setShowUserForm(true)}>Edit</button>
        </>
      )} */}
    </div>
  );
}
