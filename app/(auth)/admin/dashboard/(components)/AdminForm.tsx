'use client';

import {
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import buttonStyles from '../(components)/Buttons.module.scss';
import ErrorMessage from '../../../../(errormessage)/ErrorMessage';
import styles from '../AdminPage.module.scss';

type Props = { returnTo?: string | string[] };

export default function AdminEventForm(props: Props) {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [hostedBy, setHostedBy] = useState('');
  const [eventImage, setEventImage] = useState('');
  const [eventCosts, setEventCosts] = useState('');
  // const [createdBy, setCreatedBy] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();
  function resetFormStates() {
    setEventTitle('');
    setEventDescription('');
    setEventLocation('');
    setHostedBy('');
    setEventImage('');
    setEventCosts('');
  }

  // Function to handle form submission and API call (moving data from one place to anotgher)

  async function handleEventCreation() {
    console.log('eventImage before sending:', eventImage);
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventTitle,
        eventDescription,
        eventLocation,
        eventDate,
        hostedBy,
        eventImage,
        eventCosts,
        // eventCosts: parseFloat(eventCosts),
        // createdBy,
      }),
    });

    const data = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(`/admin/dashboard`);
    router.refresh();
  }

  return (
    <div className={styles.eventCard}>
      <div className={styles.singleEventContainer}>
        <div className={styles.h4}>
          <h4> New Event</h4>
        </div>

        <div className={styles.formContainer}>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
            }}
            className={styles.form}
          >
            <div className={styles.formItem}>
              <label htmlFor={'Event Title'} className={styles.label}>
                Event Title
              </label>
              <input
                className={styles.input}
                type="text"
                value={eventTitle}
                onChange={(event) => setEventTitle(event.currentTarget.value)}
              />
            </div>
            <div className={styles.formItem}>
              <label htmlFor={'Event Description'} className={styles.label}>
                Event Description
              </label>{' '}
              <textarea
                className={styles.inputDescription}
                value={eventDescription}
                onChange={(event) =>
                  setEventDescription(event.currentTarget.value)
                }
              />
            </div>

            <div className={styles.formItem}>
              <label htmlFor={'Event Location'} className={styles.label}>
                Event Location
              </label>{' '}
              <input
                className={styles.input}
                type="text"
                value={eventLocation}
                onChange={(event) =>
                  setEventLocation(event.currentTarget.value)
                }
              />
            </div>
            {/* <img src="https://res.cloudinary.com/drhdyavyq/image/upload/v1732025980/irmbearkwyu56zq4dknj.png" /> */}
            <div className={styles.formItem}>
              <label htmlFor={'Event Date'} className={styles.label}>
                Event Date
              </label>{' '}
              <input
                className={styles.input}
                type="date"
                value={eventDate}
                onChange={(event) => setEventDate(event.currentTarget.value)}
              />
            </div>

            <div className={styles.formItem}>
              <label htmlFor={'Hosted By'} className={styles.label}>
                Hosted By
              </label>
              <input
                className={styles.input}
                type="text"
                value={hostedBy}
                onChange={(event) => setHostedBy(event.currentTarget.value)}
              />
            </div>

            <div className={styles.formItem}>
              <label htmlFor={'Event Costs'} className={styles.label}>
                Event Costs
              </label>{' '}
              <input
                className={styles.input}
                value={eventCosts}
                onChange={(event) => setEventCosts(event.currentTarget.value)}
              />
            </div>

            {errors.map((error) => (
              <div className="error" key={`error-${error.message}`}>
                <ErrorMessage>{error.message}</ErrorMessage>
              </div>
            ))}
            <div>
              <CldUploadWidget
                onSuccess={(result: CloudinaryUploadWidgetResults) => {
                  if (
                    typeof result.info !== 'string' &&
                    'secure_url' in result.info!
                  ) {
                    setEventImage(result.info.secure_url);
                  } else {
                    console.error('Unexpected result.info type:', result.info);
                  }
                }}
                uploadPreset="sorority_event_upload"
              >
                {({ open }) => {
                  return (
                    <button
                      className={buttonStyles.uploadButton}
                      onClick={() => open()}
                    >
                      Upload Image
                    </button>
                  );
                }}
              </CldUploadWidget>
            </div>
          </form>
          <button
            onClick={async () => {
              await handleEventCreation();
              resetFormStates();
            }}
            className={buttonStyles.createButton}
          >
            <div>↪</div>
            <div>Create Event</div>
          </button>
        </div>
      </div>
    </div>
  );
}
