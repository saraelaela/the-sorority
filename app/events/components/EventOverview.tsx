'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { type Event, getEventsInsecure } from '../../../database/events';
import type { User } from '../../../database/users';
import type { Session } from '../../../migrations/00004-sessions';
import Button from '../../components/Button';
import RsvpButton from '../../components/RsvpButton';
import Tags from '../../components/Tag';
import styles from '../page.module.scss';

type Props = {
  event: Event | undefined;
  user: User;
  session: Session | undefined;
};

export default function EventOverview(props: Props) {
  if (props.event) {
    return (
      <>
        <div className={styles.eventCard}>
          <div className={styles.eventMeta}>
            <div className={styles.eventSpecs}>
              <div>
                <div className={styles.tagContainer}>
                  <Tags value={'Wann'} />
                </div>
                <div>
                  {new Date(props.event.eventDate).toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className={styles.tagContainer}>
                  <Tags value={'Wo'} />
                </div>
                <div>{props.event.eventLocation}</div>
              </div>
              <div>
                <div className={styles.tagContainer}>
                  {' '}
                  <Tags value={'Wie viel'} />
                </div>
                <div>{props.event.eventCosts}</div>
              </div>
            </div>
            {/* {`${props.event.eventImage}`} */}

            <Image
              src={`${props.event.eventImage}`}
              width={350}
              height={200}
              alt="Mitglieder des Sorority-Vorstands"
            />
          </div>
          <div className={styles.eventTitle}>{props.event.eventTitle}</div>
          <div className={styles.eventDescription}>
            <p>{props.event.eventDescription}</p>

            {props.session ? (
              <RsvpButton
                // icon={'➔'}
                value={'RSVP'}
                eventDetails={props.event.id}
                userId={props.user.id}
              />
            ) : (
              <Button
                url={'../register'}
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
                      stroke-width="4"
                    />
                  </svg>
                }
                value={'Interested? Become a Member!'}
                eventDetails={props.event.id}
                userId={props.user.id}
              />
            )}
          </div>
        </div>
      </>
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
