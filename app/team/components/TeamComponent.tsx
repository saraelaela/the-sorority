import Image from 'next/image';
import React from 'react';
import styles from '../team.module.scss';

export default function TeamComponent() {
  const teamMembers = [
    {
      id: 1,
      name: 'Marta Suzama',
      linkedIn: 'www.linkedIn',
      email: 'email',
      intro:
        'Geboren in der tschechischen Hauptstadt Prag, aufgewachsen in Deutschland, hat Wien zu ihrer Heimat auserkoren. Als Kunsthistorikerin in der Museumsarbeit sesshaft. Mit großem Herzen für Literatur, kuratiert sie den Salon Sorority. Fashionista, sammelt Kakteen und liebt Schönes. Ruhige Seele mit Hang zur Revolutionsführerin und überzeugte Feministin auf Lebenszeit. Meine Pronomen: sie/ihr',
    },
    {
      id: 2,
      name: 'Katja Grafl',
      linkedIn: 'www.linkedIn',
      email: 'email',
      intro:
        'Groß geworden in Wien Margareten, verschweigt sie ihre burgenländischen Wurzeln gern einmal. Beruflich reicht der Werdegang von Sozialer Arbeit, über irgendetwas mit Medien hin zu Projektmanagement in diversen NPOs. Definitiv mehr Sommer- als Winter-Typ und Langzeit-Vegetarierin. Meine Pronomen: sie/ihr',
    },
    {
      id: 3,
      name: 'Sibel Ada',
      linkedIn: 'www.linkedIn',
      email: 'email',
      intro:
        'Im Dorf nahe Wien aufgewachsen, mit türkischem Migrationsvordergrund. Hirnforscherin vom Brotberuf und nebenbei erbitterte Erzfeindin des Patriarchats. Ansonsten eher Wasserratte, daher oft 20 Meter unter dem Meeresspiegel anzutreffen, wenn keine Rückmeldung auf Anruf oder E-Mails. Meine Pronomen: sie/ihr',
    },
    {
      id: 4,
      name: 'Marlene Fischer',
      linkedIn: 'www.linkedIn',
      email: 'email',
      intro:
        'Das Dorf im Westen von Wien verlassen, um sich erfolgreich mit den Studien der Kunstgeschichte & KSA zu duellieren. Bündelt nun alle Leidenschaften in den Corporate Relations im Kulturbetrieb. Folgt der Strategie der grenzenlos gelebten Harmonie von künstlerischem, kulturellem und gesellschaftlichem Engagement. Immer neugierig & Nerd im Herzen. Meine Pronomen: sie/ihr',
    },
    {
      id: 5,
      name: 'Rika Mader',
      linkedIn: 'www.linkedIn',
      email: 'email',
      intro:
        '„Wir sind nicht hübsch, wir sind nicht hässlich – Wir sind wütend“ Die gebürtige Steirerin lebt für mehr Gerechtigkeit und nennt Ungleichheiten offline & online gerne beim Namen. Wenn nicht gerade im Einsatz für Gleichberechtigung, dann gerne mit Campingbus in der „Wildnis“ unterwegs oder am True Crime – Wirtschafts-Podcasts hören. Meine Pronomen: sie/ihr',
    },
    {
      id: 6,
      name: 'Natalie Atzenberger',
      linkedIn: 'www.linkedIn',
      email: 'email',
      intro:
        'Niederbayrisch-ägyptische Wurzeln, seit einem Jahrzehnt in Wien ansässig. Studierte Politologin samt transdisziplinärer Perspektive zu Ungleichheit, Entwicklung, Gender u.v.m. Beruflich verortet bei Compliance, Diversity & Inclusion. Möchte den Menschen die strukturelle Dimension von Ungleichheit begreiflich machen. Würde gerne viel öfter in den Tag hineinleben, am besten mit dem Gesicht in der Sonne! Meine Pronomen: sie/ihr',
    },
    {
      id: 7,
      name: 'Carmen Cirnfus',
      linkedIn: 'www.linkedIn',
      email: 'email',
      intro:
        'In Kenia geboren und am österreichischen Land aufgewachsen. Das Leben zwischen den Kulturen, hat ihr mehrere Perspektiven gezeigt, was ihren Einsatz für die Rechte und Gleichstellung der Geschlechter sowie ihr streben Stereotypen und Vorurteile aufzubrechen, prägte. Neben dem Feminismus hat sie bereits von klein auf eine Leidenschaft für Musik und Film entwickelt. Diese Leidenschaft führte sie zum Studium „Film-, TV- und Medienproduktion“ und danach in die Arbeitswelt der Filmindustrie. Als DJ erforscht sie Klänge und stellt ihr Set auch gerne mit von Frauen, weiblich Gelesenen und nicht-binären Artists zusammen. Meine Pronomen: sie/they',
    },
    {
      id: 8,
      name: 'Viktoria Stanzl',
      linkedIn: 'www.linkedIn',
      email: 'email',
      intro:
        'Nach kurzem Abstecher in die Münchner Innovationsszene wieder in die Wiener Heimat zurückgekehrt um Gender Studies zu studieren und die europäische Startup Landschaft inklusiver zu gestalten. Auch beruflich mit dem Aufbau von Communities beschäftigt und absolute Pop-Culture Enthusiast. Meine Pronomen: sie/ihr',
    },
    {
      id: 9,
      name: 'Evin Ersen',
      linkedIn: 'www.linkedIn',
      email: 'email',
      intro:
        'In der Türkei geboren und seit 11 Jahren in Wien lebend, betrachtet sie diese Stadt als ihr Zuhause. Sie arbeitet im Bereich HR und hat ein besonderes Interesse an Diversity- und Gender-Management. Es liegt ihr am Herzen, immer mit der Flow zu gehen und den Moment zu genießen. Meine Pronomen: sie/ihr',
    },
    {
      id: 10,
      name: 'Carina Gastelsberger',
      linkedIn: 'www.linkedIn',
      email: 'email',
      intro:
        'Geboren und aufgewachsen in Oberösterreich, war das Studium in Wien eine gute Gelegenheit, um die beengende, ländliche Umgebung gegen die Freiheit der Stadt auszutauschen. Nach dem Abschluss in Politikwissenschaft, Auslandsaufenthalten in Tschechien und fast drei Jahren in Brüssel, war die Liebe zu Wien immer noch groß, und sie beschloss zu bleiben.Beruflich tätig in der Exportförderung im Bereich Mobilität und Technologie, hat sie Herz und Hirn schon lange an Feminismus und Chancengleichheit verloren. Mit zunehmendem Alter (und Anzahl der Kinder) ist die Erkenntnis gereift, dass es starke Banden braucht, um gegen strukturelle Ungleichheiten anzukämpfen. Fix the system – not the women, not the minorities! Meine Pronomen: sie/ihr',
    },
  ];
  return (
    <div className={styles.teamWrapper}>
      <div className={styles.teamContainer}>
        <h2 className={styles.h2}>Board</h2>
        <div className={styles.teamOverview}>
          {teamMembers.map((teamMember) => {
            return (
              <div key={teamMember.id} className={styles.teamCard}>
                <Image
                  src={`/images/board/${teamMember.name}.jpg`}
                  width={280}
                  height={280}
                  alt="Mitglieder des Sorority-Vorstands"
                />
                <div className={styles.teamMemberName}>{teamMember.name}</div>
                <div className={styles.contact}>
                  <div>{teamMember.linkedIn}</div>
                  <div>{teamMember.email}</div>
                </div>
                <p className={styles.teamMemberIntro}>{teamMember.intro}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
