'use client';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import formStyles from '../../../(auth)/admin/dashboard/AdminPage.module.scss';
import type { User } from '../../../../database/users';
import buttonStyles from '../../admin/dashboard/(components)/Buttons.module.scss';
import type { EditUserResponseBody } from '../../api/users/route';
import styles from '../profile.module.scss';

type Props = {
  user: User;
  firstName: string;
};

export default function UserForm(props: Props) {
  const router = useRouter();
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
      console.log('error:', data.errors);
      return;
    }

    console.log('geschafft');
    props.setShowUserForm(false);
    router.refresh();

    // router.push(`/profile/${props.firstName}`);
    // router.();
  }
  console.log('props user being passed', props.user);

  return (
    <>
      <div>
        <div className={styles.userCard}>
          {/* <label>
            Picture
            <input
              value={profilePicture}
              onChange={(event) => setProfilePicture(event.currentTarget.value)}
            />
          </label> */}
          <Image
            src={profilePicture || '/images/image-placeholder.png'}
            width={280}
            height={280}
            alt="Mitglieder des Sorority-Vorstands"
          />
          <CldUploadWidget
            uploadPreset="sorority_event_upload"
            onSuccess={(results, options) => {
              if (results.info) {
                console.log('results info secure_url', results.info.secure_url);
                console.log('Upload info test NN:', results.info);
                setProfilePicture(results.info.secure_url);
              }
              console.log('Upload success:', results);
            }}
          >
            {({ open }) => {
              return (
                <button
                  onClick={() => open()}
                  className={buttonStyles.uploadButton}
                >
                  <div> + </div>
                  <div>Upload/Change Image</div>
                </button>
              );
            }}
          </CldUploadWidget>

          <form
            onSubmit={async (event) => await handleUserUpdate(event)}
            className={styles.form}
          >
            <div>
              <div className={formStyles.formItem}>
                {' '}
                <label className={formStyles.label}>
                  name
                  <input
                    className={formStyles.input}
                    value={firstName}
                    onChange={(event) =>
                      setFirstName(event.currentTarget.value)
                    }
                  />
                </label>
              </div>
              <div className={formStyles.formItem}>
                {' '}
                <label className={formStyles.label}>
                  last name
                  <input
                    className={formStyles.input}
                    value={lastName}
                    onChange={(event) => setLastName(event.currentTarget.value)}
                  />
                </label>
              </div>

              <div className={formStyles.formItem}>
                {' '}
                <label className={formStyles.label}>
                  occupation
                  <input
                    className={formStyles.input}
                    value={occupation}
                    onChange={(event) =>
                      setOccupation(event.currentTarget.value)
                    }
                  />
                </label>
              </div>

              <div className={formStyles.formItem}>
                {' '}
                <label className={formStyles.label}>
                  intro text
                  <textarea
                    className={styles.inputDescription}
                    value={introText}
                    onChange={(event) =>
                      setIntroText(event.currentTarget.value)
                    }
                  />
                </label>
              </div>

              <div className={formStyles.formItem}>
                <label className={formStyles.label}>
                  linkedin
                  <input
                    className={formStyles.input}
                    value={linkedIn}
                    onChange={(event) => setLinkedIn(event.currentTarget.value)}
                  />
                </label>
              </div>
            </div>
            <button className={buttonStyles.update}>
              <div> ✮ </div>
              <div>save update</div>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
