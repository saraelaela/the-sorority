import Image from 'next/image';
import Footer from '../../../components/Footer';
import styles from '../profile.module.scss';

type Props = {
  params: Promise<{
    firstName: string;
  }>;
};

export default async function UserProfilePage(props: Props) {
  const { firstName } = await props.params;

  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.userDashboard}>
            <div>
              <h3 className={styles.h3}>
                Welcome,
                <br /> {firstName}!
              </h3>{' '}
              <div> This is the Intro</div>
            </div>

            <div className={styles.imageCard}> </div>
          </div>
          <div className={styles.userArea}>
            {' '}
            <div className={styles.userCard}>
              <div className={styles.contactDetails}>
                <Image
                  src="/images/Register.png"
                  width={300}
                  height={225}
                  alt="Mitglieder des Sorority-Vorstands"
                />
                <button>Edit</button>

                <div className={styles.form}>
                  <div>Membership ID</div>
                  <div>{firstName}</div>
                  <div>Last Name</div>
                  <button type="button">Edit your details</button>
                </div>
              </div>
            </div>
            <div className={styles.rsvpUser}>Events user has RSVPd: </div>
          </div>
        </div>
        <Footer customFooter="customFooterProfile" />
      </div>
    </>
  );
}
