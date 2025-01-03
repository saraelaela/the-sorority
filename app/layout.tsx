import './globals.css';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUser } from '../database/users';
import LogoutButton from './(auth)/logout/LogoutButton';
import Footer from './components/Footer';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Solidarity, Sisters!',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  // customFooter?: string | null;
}>) {
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  // 2. Get current logged in user from database using the sessionToken value
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie?.value));

  return (
    <html lang="en">
      <body>
        <header className={styles.header}>
          <nav className={styles.navClass}>
            <Link href="/">Home</Link>
            <Link href="/events">Events</Link>
            {/* <Link href="/">About</Link> */}
            <Link href="/team">Team</Link>
            {/* <Link href="/">Magazin</Link> */}
            {/* <Link href="/">Press</Link> */}

            <div>
              {user ? (
                user.isAdmin ? (
                  <div className={styles.userArea}>
                    <Link href="/admin/dashboard">Dashboard</Link>
                    <Link href={`/profile/${user.firstName}`}>My Account</Link>
                    <LogoutButton />
                  </div>
                ) : (
                  <div className={styles.userArea}>
                    <Link href={`/profile/${user.firstName}`}>My Account</Link>

                    <LogoutButton />
                  </div>
                )
              ) : (
                <div className={styles.userArea}>
                  <Link href="/register">Join Us</Link>
                  <Link href="/login">Log-in</Link>
                </div>
              )}
            </div>
          </nav>
        </header>
        <main className={styles.main}>{children}</main>
        {/* {customFooter && <div>{customFooter}</div>} */}
      </body>
    </html>
  );
}
