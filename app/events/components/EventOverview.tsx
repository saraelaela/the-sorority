'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { type Event, getEventsInsecure } from '../../../database/events';
import Tags from '../../components/Tag';
import styles from '../page.module.scss';

type Props = {
  event: Event | undefined;
};

export default function EventOverview(props: Props) {
  console.log('prop event', props.event);

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

            <Image
              src="/images/Register.png"
              width={350}
              height={200}
              alt="Mitglieder des Sorority-Vorstands"
            />
          </div>
          <div className={styles.eventTitle}>{props.event.eventTitle}</div>
          <div>
            {props.event.eventDescription} <button>Anmelden</button>
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
