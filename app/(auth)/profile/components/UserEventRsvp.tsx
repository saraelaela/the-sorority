import Image from 'next/image';
import {
  getUsersInsecure,
  updateUsersInsecure,
  type User,
} from '../../../../database/users';
import type { Rsvp } from '../../../../migrations/00006-rsvp';
import LinkedIn from '../../../components/Icons/LinkedIn';
import SectionTitle from '../../../components/SectionTitle';
import userCard from '../../../team/team.module.scss';
import styles from './UserEventRsvp.module.scss';
import UserForm from './UserForm';
import UserProfile from './UserProfile';

type Props = {
  userRsvp: Rsvp;
  user: User;
  firstName: string;
};

export default async function UserEventRsvp(props: Props) {
  return (
    <>
      <div className={styles.eventWrapper}>
        <div className={styles.eventContainer}>
          <h1>Your Profile</h1>
          <div className={styles.userOverview}>
            <UserProfile firstName={props.firstName} user={props.user} />
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
