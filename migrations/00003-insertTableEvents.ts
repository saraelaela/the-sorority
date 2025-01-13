import type { Sql } from 'postgres';

const events = [
  {
    eventTitle: 'Sorority X Volkstheater „Einsame Menschen”',
    eventDescription:
      'Das zweifach für den Nestroy-Preis nominierte Stück des deutschen Literaturnobelpreisträgers Gerhart Hauptmann portraitiert vier Menschen, die aus ihren Abhängigkeiten nicht mehr herausfinden:Hauptmanns Drama kreist um das Dilemma der Freiheit, das Festhalten an Traditionen, die Suche nach neuen Beziehungsmodellen – und um das persönliche Glück, das sich zwischen all diesen Positionen einen Weg schlagen muss. Dabei stellt es auch heute noch gültige Fragen an unsere Art zusammen zu leben: Zu wieviel Aufopferung bin ich bereit, wie stark poche ich auf meine Selbstverwirklichung? Wie kann ich mich frei fühlen, ohne dabei anderen ihre Freiheit zu nehmen? Und wie können wir uns von den Dogmen früherer Generationen lösen, ohne deren Dynamiken unbewusst zu wiederholen?Im Anschluss findet ein Gespräch mit einer Dramaturg:in des Hauses statt und das Volkstheater gibt uns einen aus!',
    eventLocation: 'Volkstheater Wien',
    eventDate: new Date('01-02-2025'),
    hostedBy: 'Clara Mustermann',
    eventImage:
      'https://res.cloudinary.com/drhdyavyq/image/upload/v1731595630/tfaten6tleqiyewgjay9.jpg',
    eventCosts: '20 % auf Kategorie 5',
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
