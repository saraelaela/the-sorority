'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { type Event } from '../../../database/events';
import type { User } from '../../../database/users';
import type { Session } from '../../../migrations/00004-sessions';
import type { EventRsvp } from '../../../migrations/00006-rsvp';
import Button from '../../components/Button';
import RsvpButton from '../../components/RsvpButton';
import Tags from '../../components/Tag';
import styles from '../page.module.scss';

type Props = {
  event: Event | undefined;
  user: User | null;
  session: Session | undefined;
  mobileEvent: boolean;
  setMobileEvent: (value: boolean) => void;
  rsvps?: EventRsvp[];
};

export default function EventOverview(props: Props) {
  console.log('RsvpList:', props.rsvps);
  const firstAttendee = props.rsvps?.[0]?.firstName;
  if (props.event) {
    return (
      <div className={styles.eventCard}>
        <div className={styles.eventMeta}>
          <button
            className={styles.button}
            onClick={() => props.setMobileEvent(!props.mobileEvent)}
          >
            <svg
              width="30"
              height="25"
              viewBox="0 0 20 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.026 1.24151L4.10081 13.3419" stroke="#6e28e3" />
              <path d="M4.33366 1.32129L15.6663 13.9783" stroke="#6e28e3" />
            </svg>
          </button>
          <div className={styles.eventSpecs}>
            <div className={styles.tagWrapper}>
              <div className={styles.tagContainer}>
                <Tags value={'When'} />
              </div>
              <div>
                {new Date(props.event.eventDate).toLocaleDateString('de-DE')}
              </div>
            </div>
            <div className={styles.tagWrapper}>
              <div className={styles.tagContainer}>
                <Tags value={'Where'} />
              </div>
              <div>{props.event.eventLocation}</div>
            </div>
            <div className={styles.tagWrapper}>
              <div className={styles.tagContainer}>
                {' '}
                <Tags value={'Costs'} />
              </div>
              <div>{props.event.eventCosts}</div>
            </div>
          </div>

          <Image
            src={`${props.event.eventImage}`}
            style={{
              width: '50%',
              height: 'auto',
            }}
            width={350}
            height={200}
            alt="Mitglieder des Sorority-Vorstands"
          />
        </div>
        <div className={styles.eventTitle}>{props.event.eventTitle}</div>
        <div className={styles.eventDescription}>
          <p>{props.event.eventDescription}</p>

          {props.session && props.user ? (
            <div>
              <RsvpButton
                value={'RSVP'}
                eventDetails={props.event.id}
                userId={props.user.id}
              />{' '}
              <div className={styles.attendeeContainer}>
                Meet {firstAttendee} & many others at this Event!
                <div className={styles.attendeeGallery}>
                  {props.rsvps?.map((rsvp, index: number) => (
                    <Image
                      key={`rsvp-${rsvp.id}`}
                      className={styles.attendeeImage}
                      src={
                        rsvp.profilePicture || '/images/image-placeholder.png'
                      }
                      style={{
                        width: '7%',
                        height: 'auto',
                        borderRadius: '30px',
                        zIndex: props.rsvps!.length - index,
                      }}
                      width={50}
                      height={50}
                      alt="Mitglieder des Sorority-Vorstands"
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link href={'/register'}>
                <Button
                  url={'/register'}
                  icon={
                    <svg
                      width="10.5"
                      height="9"
                      viewBox="0 0 42 37"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                    >
                      <path
                        d="M0 18.5H38M22.5 2L39 18.5L22.5 35"
                        stroke="#6F28E3"
                        strokeWidth="4"
                      />
                    </svg>
                  }
                  value={'Interested? Become a Member!'}
                />
              </Link>
              <div className={styles.attendeeContainer}>
                Meet {firstAttendee} & many others at this Event!
                <div className={styles.attendeeGallery}>
                  {props.rsvps?.map((rsvp, index: number) => (
                    <Image
                      key={`rsvp-${rsvp.id}`}
                      className={styles.attendeeImage}
                      src={
                        rsvp.profilePicture || '/images/image-placeholder.png'
                      }
                      style={{
                        width: '7%',
                        height: 'auto',
                        borderRadius: '30px',
                        zIndex: props.rsvps!.length - index,
                      }}
                      width={50}
                      height={50}
                      alt="Mitglieder des Sorority-Vorstands"
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <div>
            <h1>No event selected</h1>
          </div>
        </div>
      </div>
    );
  }
}
