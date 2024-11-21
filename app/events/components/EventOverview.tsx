'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { type Event, getEventsInsecure } from '../../../database/events';
import type { User } from '../../../database/users';
import Button from '../../components/RsvpButton';
import RsvpButton from '../../components/RsvpButton';
import Tags from '../../components/Tag';
import styles from '../page.module.scss';

type Props = {
  event: Event | undefined;
  user: User;
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
          <div>
            {props.event.eventDescription}
            <RsvpButton
              icon={'➔'}
              value={'Anmelden'}
              eventDetails={props.event.id}
              userId={props.user.id}
            />
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
