import Image from 'next/image';
import React from 'react';
import type { User } from '../../../../database/users';
import type { Rsvp } from '../../../../migrations/00006-rsvp';
import SectionTitle from '../../../components/SectionTitle';
import styles from './UserEventRsvp.module.scss';

type Props = {
  userRsvp: Rsvp;
};

export default function UserEventRsvp(props: Props) {
  return (
    <>
      <div className={styles.eventWrapper}>
        <div className={styles.eventContainer}>
          <h1>Dein Bereich</h1>
          <div className={styles.userCard}>
            <div className={styles.userDetails}>
              <Image
                src="/images/Register.png"
                width={300}
                height={300}
                alt="Mitglieder des Sorority-Vorstands"
              />
              <div>Name</div>
              <div className={styles.connect}>
                <div>LI</div> <div>Email</div>
              </div>
              <div>
                Geboren und aufgewachsen in Döbling, mit ägyptischem Background.
                Im Brotberuf angehende Steuerberaterin/Wirtschaftsprüferin und
                Office-Allrounderin. Absolute Rap-Kennerin und
                Organisationsfreak. Ansonsten hauptsächlich wütend, aber auf
                eine produktive Art und Weise. Solidarity over everything!
              </div>
            </div>
            <div className={styles.eventOverview}>
              <h3 className={styles.h3}>Your upcoming Events </h3>
              {props.userRsvp.map((rsvp) => {
                return (
                  <div
                    key={`events-${rsvp.id}`}
                    className={styles.eventListItem}
                  >
                    <div className={styles.eventDate}>
                      {new Date(rsvp.eventDate).toLocaleDateString()}
                    </div>
                    <div className={styles.eventDetails}>
                      <div className={styles.eventTags}>
                        <div>event Time</div>
                        <div>{rsvp.eventLocation}</div>
                      </div>
                      <h4 className={styles.h4}>{rsvp.eventTitle}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* <div>{props.userRsvp.eventId}</div> */}
      </div>
    </>
  );
}
