import type { Sql } from 'postgres';

const events = [
  {
    eventTitle: 'Sorority X Volkstheater „Einsame Menschen”',
    eventDescription:
      'Das zweifach für den Nestroy-Preis nominierte Stück des deutschen Literaturnobelpreisträgers Gerhart Hauptmann portraitiert vier Menschen, die aus ihren Abhängigkeiten nicht mehr herausfinden:Hauptmanns Drama kreist um das Dilemma der Freiheit, das Festhalten an Traditionen, die Suche nach neuen Beziehungsmodellen – und um das persönliche Glück, das sich zwischen all diesen Positionen einen Weg schlagen muss. \n Dabei stellt es auch heute noch gültige Fragen an unsere Art zusammen zu leben: Zu wieviel Aufopferung bin ich bereit, wie stark poche ich auf meine Selbstverwirklichung? Wie kann ich mich frei fühlen, ohne dabei anderen ihre Freiheit zu nehmen? Und wie können wir uns von den Dogmen früherer Generationen lösen, ohne deren Dynamiken unbewusst zu wiederholen? \n Im Anschluss findet ein Gespräch mit einer Dramaturg:in des Hauses statt und das Volkstheater gibt uns einen aus!',
    eventLocation: 'Volkstheater Wien',
    eventDate: new Date('01-02-2025'),
    hostedBy: 'Clara Mustermann',
    eventImage:
      'https://res.cloudinary.com/drhdyavyq/image/upload/v1731595630/tfaten6tleqiyewgjay9.jpg',
    eventCosts: '20 % auf Kategorie 5',
  },
  {
    eventTitle: 'Sorority Generalversammlung',
    eventDescription:
      'Wir freuen uns auf ein aufregendes Vereinsjahr 2025 mit euch und laden euch sehr herzlich zur Generalversammlung der Sorority ein!Die Sorority ist ein intersektional feministischer Verein zur Förderung der Gleichstellung und Sichtbarmachung der Arbeits- und Lebensrealitäten von Frauen und als Frauen gelesene Personen. Mit viel Freude blicken wir auf die zahlreichen Aktivitäten 2024 – allen voran das legendäre Feministival – zurück und mit einer ganzen Menge an neuen Ideen schauen wir nach vorne. 🚀 \n Wir verabschieden die Vorständinnen Natalie Atzenberger, Carmen Cirnfus, Rika Mader und Viktoria Stanzl in den Sorority-Ruhestand und begrüßen unsere Sisters Ilayda Ari und Laura Steinl ins Board, das sich bei unserer Generalversammlung am 5. Februar zur Wahl stellt. \n ACHTUNG: Um an der Generalversammlung teilzunehmen, überweist bitte rechtzeitig euren Mitgliedsbeitrag 2025  in der Höhe von € 48,- oder den Förder-Beitrag in der Höhe von € 90,-. Rund 20 Sisters arbeiten ehrenamtlich an Sorority Veranstaltungen, Content & allem was dazu gehört. \n Als Mitglied der Sorority bist Du Teil eines Netzwerks großartiger Frauen* und kannst unser diverses Angebot – von CV-Checks über Coachings, spannende Workshops und die verschiedensten Kulturveranstaltungen – nutzen.',
    eventLocation: 'online',
    eventDate: new Date('05-02-2025'),
    hostedBy: 'Clara Mustermann',
    eventImage:
      'https://res.cloudinary.com/drhdyavyq/image/upload/v1731595630/tfaten6tleqiyewgjay9.jpg',
    eventCosts: 'Förderbeitrag',
  },
  {
    eventTitle: 'BUSINESS TALK x Networking x Brunch',
    eventDescription:
      'Auch wenn dich das Patriarchat oft schlecht schlafen lässt: NEUER MORGEN – NEUES GAME – IM BUSINESS LIFE Sisterhood im Business life darf schon früh starten. Motivation-Boost gefällig? \n Wir starten den Business Day mit einem kleinen Pep-Talk unter Business Sisters am Frühstückstisch! \n Du bist Selbstständige oder Gründerin und willst motiviert in den Tag starten? Unser Business Talk bringt frische Energie direkt an den Frühstückstisch:Motivations-Boosts – weil du mehr kannst, als du denkst! Austausch und Inspiration zu Themen, die uns alle beschäftigen.Vernetzung mit Gleichgesinnten – echte Kontakte, echtes Business-Sisterhood. Themen-Impulse, die dein Business aufs nächste Level bringen. \n Bring deine Themen mit – und komm mit dem Mindset: Was kannst du anderen bieten? Welche Inputs haben mir im Business life schon geholfen? Wo suchst du selbst Austausch oder neue Skills? \n Komm in unsere Business Sisterhood und lerne andere coole Unternehmer:innen, Gründer:innen kennen – und solche, die es noch werden wollen!',
    eventLocation: 'Cafe Siebenstern',
    eventDate: new Date('15-02-2025'),
    hostedBy: 'Clara Mustermann',
    eventImage:
      'https://res.cloudinary.com/drhdyavyq/image/upload/v1731595630/tfaten6tleqiyewgjay9.jpg',
    eventCosts: 'Förderbeitrag',
  },
];

export async function up(sql: Sql) {
  for (const event of events) {
    await sql`
      INSERT INTO
        events (
          event_title,
          event_description,
          event_location,
          event_date,
          hosted_by,
          event_image,
          event_costs
        )
      VALUES
        (
          ${event.eventTitle},
          ${event.eventDescription},
          ${event.eventLocation},
          ${event.eventDate},
          ${event.hostedBy},
          ${event.eventImage},
          ${event.eventCosts}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const event of events) {
    await sql`DELETE FROM events`;
  }
}
