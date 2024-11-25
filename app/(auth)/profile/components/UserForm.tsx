'use client';
import { useState } from 'react';
import type { User } from '../../../../database/users';
import UserCard from '../../../components/UserCard';
import type { EditUserResponseBody } from '../../api/users/route';
import styles from '../profile.module.scss';

type Props = {
  user: User;
};

export default function UserForm(props: Props) {
  const [userId, setUserId] = useState(props.user.id);
  const [firstName, setFirstName] = useState(props.user.firstName);
  const [lastName, setLastName] = useState(props.user.lastName);
  const [occupation, setOccupation] = useState(props.user.occupation);
  const [introText, setIntroText] = useState(props.user.introText);
  const [linkedIn, setLinkedIn] = useState(props.user.linkedIn);
  const [profilePicture, setProfilePicture] = useState(
    props.user.profilePicture,
  );
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState([]);

  async function handleUserUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userId,
        firstName,
        lastName,
        ...(occupation && { occupation }),
        ...(introText && { introText }),
        ...(profilePicture && { profilePicture }),
        ...(linkedIn && { linkedIn }),
      }),
    });

    const data: EditUserResponseBody = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }
  }
  console.log('props user being passed', props.user);

  return (
    <>
      <div>
        <div className={styles.userCard}>
          <form onSubmit={async (event) => await handleUserUpdate(event)}>
            <label>
              name
              <input
                value={firstName}
                onChange={(event) => setFirstName(event.currentTarget.value)}
              />
            </label>
            <label>
              last name
              <input
                value={lastName}
                onChange={(event) => setLastName(event.currentTarget.value)}
              />
            </label>
            <label>
              occupation
              <input
                value={occupation}
                onChange={(event) => setOccupation(event.currentTarget.value)}
              />
            </label>
            <label>
              intro text
              <input
                value={introText}
                onChange={(event) => setIntroText(event.currentTarget.value)}
              />
            </label>
            <label>
              linkedin
              <input
                value={linkedIn}
                onChange={(event) => setLinkedIn(event.currentTarget.value)}
              />
            </label>
            <label>
              Picture
              <input
                value={profilePicture}
                onChange={(event) =>
                  setProfilePicture(event.currentTarget.value)
                }
              />
            </label>
          </form>
        </div>
      </div>
    </>
  );
}
