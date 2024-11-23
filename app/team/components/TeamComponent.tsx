import Image from 'next/image';
import React from 'react';
import styles from '../team.module.scss';

export default function TeamComponent() {
  return (
    <div className={styles.teamWrapper}>
      <div className={styles.teamContainer}>
        <h2 className={styles.h2}>Board</h2>
        <div className={styles.teamOverview}>
          <div className={styles.teamLine}>
            <div className={styles.teamCard}>
              <Image
                src="/images/board/0C4A6154-300x300.jpg"
                width={280}
                height={280}
                alt="Mitglieder des Sorority-Vorstands"
              />
              <div>Marta Suzama</div>
              <div className={styles.contact}>
                <div>LI</div>
                <div>email</div>
              </div>
              <p className={styles.teamDescription}>
                Aufgewachsen im Speckgürtel Wiens, nun Naschkatze in
                #rudolfscrime. Bei Tag begeisterte Personalmanagerin und
                glühende Gerechtigkeitskämpferin 24/7, trägt Schweden im Herzen
                und studiert Lebensgeschichten.
              </p>
            </div>
            <div className={styles.teamCard}>
              <Image
                src="/images/board/0C4A6551-300x300.jpg"
                width={280}
                height={280}
                alt="Mitglieder des Sorority-Vorstands"
              />
              <div>Katja Grafl</div>
              <div className={styles.contact}>
                <div>LI</div>
                <div>email</div>
              </div>
              <p className={styles.teamDescription}>
                Geboren und aufgewachsen in Döbling, mit ägyptischem Background.
                Im Brotberuf angehende Steuerberaterin/Wirtschaftsprüferin und
                Office-Allrounderin. Absolute Rap-Kennerin und
                Organisationsfreak. Ansonsten hauptsächlich wütend, aber auf
                eine produktive Art und Weise. Solidarity over everything!
              </p>
            </div>
          </div>
          <div className={styles.teamLine}>
            <div className={styles.teamCard}>
              <Image
                src="/images/board/0C4A6973-300x300.jpg"
                width={280}
                height={280}
                alt="Mitglieder des Sorority-Vorstands"
              />
              <div>Sibel Ada</div>
              <div className={styles.contact}>
                <div>LI</div>
                <div>email</div>
              </div>
              <p className={styles.teamDescription}>
                Im Dorf nahe Wien aufgewachsen, mit türkischem
                Migrationsvordergrund. Hirnforscherin vom Brotberuf und nebenbei
                erbitterte Erzfeindin des Patriarchats. Ansonsten eher
                Wasserratte, daher oft 20 Meter unter dem Meeresspiegel
                anzutreffen, wenn keine Rückmeldung auf Anruf oder E-Mails.
                Meine Pronomen: sie/ihr
              </p>
            </div>
            <div className={styles.teamCard}>
              <Image
                src="/images/board/0C4A6412-300x300.jpg"
                width={280}
                height={280}
                alt="Mitglieder des Sorority-Vorstands"
              />
              <div>Marlene Fischer</div>
              <div className={styles.contact}>
                <div>LI</div>
                <div>email</div>
              </div>
              <p className={styles.teamDescription}>
                Das Dorf im Westen von Wien verlassen, um sich erfolgreich mit
                den Studien der Kunstgeschichte & KSA zu duellieren. Bündelt nun
                alle Leidenschaften in den Corporate Relations im Kulturbetrieb.
                Folgt der Strategie der grenzenlos gelebten Harmonie von
                künstlerischem, kulturellem und gesellschaftlichem Engagement.
                Immer neugierig & Nerd im Herzen. Meine Pronomen: sie/ihr
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
