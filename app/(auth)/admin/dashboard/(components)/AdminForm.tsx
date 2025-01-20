'use client';

import {
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import buttonStyles from '../(components)/Buttons.module.scss';
import ErrorMessage from '../../../../(errormessage)/ErrorMessage';
import type { Event } from '../../../../../database/events';
import styles from '../AdminPage.module.scss';

type Props = {
  returnTo?: string | string[];
  events: Event[];
  setShowForm: (Status: boolean) => void;
  showForm: boolean;
  selectedEvent?: Event | null;
};

export default function AdminEventForm(props: Props) {
  const isEditing = !!props.selectedEvent;
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [hostedBy, setHostedBy] = useState('');
  const [eventImage, setEventImage] = useState('');
  const [eventCosts, setEventCosts] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();
  const [apiFetch, setApiFetch] = useState('');
  function resetFormStates() {
    setEventTitle('');
    setEventDescription('');
    setEventLocation('');
    setHostedBy('');
    setEventImage('');
    setEventCosts('');
  }

  useEffect(() => {
    if (isEditing) {
      setEventTitle(props.selectedEvent?.eventTitle || '');
      setEventDescription(props.selectedEvent?.eventDescription || '');
      setEventLocation(props.selectedEvent?.eventLocation || '');
      // setEventDate(props.selectedEvent.eventDate).toISOString().split('T')[0] || '');
      setHostedBy(props.selectedEvent?.hostedBy || '');
      setEventImage(props.selectedEvent?.eventImage || '');
      setEventCosts(props.selectedEvent?.eventCosts || '');
    }
  }, [isEditing, props.selectedEvent]);

  async function handleEventCreation() {
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

  async function editEvent() {
    const response = await fetch(`/api/events/${props.selectedEvent?.id}`, {
      method: 'PUT',
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
          <h4>{isEditing ? 'Edit Event' : 'Create Events'}</h4>
        </div>

        <div className={styles.formContainer}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
            className={styles.form}
          >
            <div className={styles.formItem}>
              <label htmlFor="Event Title" className={styles.label}>
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
              <label htmlFor="Event Description" className={styles.label}>
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
              <label htmlFor="Event Location" className={styles.label}>
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
            <div className={styles.formItem}>
              <label htmlFor="Event Date" className={styles.label}>
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
              <label htmlFor="Hosted By" className={styles.label}>
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
              <label htmlFor="Event Costs" className={styles.label}>
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

          {isEditing ? (
            <button
              onClick={async () => {
                await editEvent();
                resetFormStates();
              }}
              className={buttonStyles.createButton}
            >
              <div>↪</div>
              <div>Save Changes</div>
            </button>
          ) : (
            <button
              onClick={async () => {
                await handleEventCreation();
                resetFormStates();
              }}
            >
              Create Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
