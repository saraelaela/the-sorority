import Image from 'next/image';
import { getUsersInsecure } from '../database/users';
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
        hey
        {/* <h1>New User Inserted: {insertedUser.username}</h1> */}
      </main>
    </div>
  );
}
