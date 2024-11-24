import Image from 'next/image';
import React from 'react';
import type { User } from '../../../../database/users';
import type { Rsvp } from '../../../../migrations/00006-rsvp';
import SectionTitle from '../../../components/SectionTitle';
import userCard from '../../../team/team.module.scss';
import styles from './UserEventRsvp.module.scss';

type Props = {
  userRsvp: Rsvp;
};

export default function UserEventRsvp(props: Props) {
  const users = [
    {
      id: 1,
      name: 'Marta Suzama',
      linkedIn: 'www.linkedIn',
      email: 'email',
      intro:
        'Geboren in der tschechischen Hauptstadt Prag, aufgewachsen in Deutschland, hat Wien zu ihrer Heimat auserkoren. Als Kunsthistorikerin in der Museumsarbeit sesshaft. Mit großem Herzen für Literatur, kuratiert sie den Salon Sorority. Fashionista, sammelt Kakteen und liebt Schönes. Ruhige Seele mit Hang zur Revolutionsführerin und überzeugte Feministin auf Lebenszeit. Meine Pronomen: sie/ihr',
    },
  ];
  return (
    <>
      <div className={styles.eventWrapper}>
        <div className={styles.eventContainer}>
          <h1>Your Profile</h1>
          <div className={styles.userOverview}>
            <div className={styles.userCard}>
              {users.map((users) => {
                return (
                  <div key={users.id} className={styles.userDetails}>
                    <Image
                      src={`/images/board/${users.name}.jpg`}
                      width={280}
                      height={280}
                      alt={`${users.name}`}
                    />
                    <div className={styles.userName}>{users.name}</div>
                    <div className={styles.contact}>
                      <div>{users.linkedIn}</div>
                      <div>{users.email}</div>
                    </div>
                    <p className={styles.userIntro}>{users.intro}</p>
                  </div>
                );
              })}
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
