import Image from 'next/image';
import HomeComponent from './HomeComponent';
import styles from './page.module.css';

export default async function Home() {
  // const newUser = {
  //   username: 'whaaaattestuser',
  //   password: 'securepassword',
  //   email: 'test@example.com',
  //   role: 'user',
  //   intro_text: 'Hello!',
  //   profile_picture: '/path/to/image.jpg',
  //   created_at: new Date(),
  // };

  // const insertedUser = await getUsersInsecure(newUser);
  // console.log('Inserted user:', insertedUser);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.logoArea}></div>
        <h1 className={styles.h1}>The: </h1>
        <h1 className={styles.h1}>Sorority </h1>
        <HomeComponent />
        {/* <h1>New User Inserted: {insertedUser.username}</h1> */}
      </main>
    </div>
  );
}
