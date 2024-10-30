import styles from './homeComponent.module.scss';

export default function HomeComponent() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.test}>
          <h2>10 Jahre Feministival!</h2>
        </div>
        <div>
          <h2 className={styles.h2}>
            Ev
            <br />
            en
            <br />
            ts
          </h2>
        </div>
      </main>
    </>
  );
}
