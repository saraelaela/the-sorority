import styles from './homeComponent.module.scss';

export default function HomeComponent() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.test}>10 Jahre Feministival!</div>
        <div>Events</div>
      </main>
    </>
  );
}
