import Image from 'next/image';
import React from 'react';
import LinkedIn from '../../components/Icons/LinkedIn';
import styles from '../team.module.scss';

export default function TeamComponent() {
  const teamMembers = [
    {
      id: 1,
      name: 'Marta Suzama',
      linkedIn: 'www.linkedIn',
      email: 'marta@sorority.at',
      intro:
        'Born in the Czech capital of Prague, raised in Germany, she has chosen Vienna as her home. Settled as an art historian working in the museum field. With a great passion for literature, she curates the Salon Sorority. A fashionista who collects cacti and loves beautiful things. A calm soul with a tendency toward revolutionary leadership and a lifelong committed feminist. My pronouns: she/her.',
    },
    {
      id: 2,
      name: 'Katja Grafl',
      linkedIn: 'www.linkedIn',
      email: 'katja@sorority.at',
      intro:
        'Raised in Vienna\'s Margareten district, she often keeps her Burgenland roots under wraps. Her career path spans from social work to "something with media" and on to project management in various non-profit organizations. Definitely more of a summer than a winter type and a long-time vegetarian. My pronouns: she/her.',
    },
    {
      id: 3,
      name: 'Sibel Ada',
      linkedIn: 'www.linkedIn',
      email: 'sibel@sorority.at',
      intro:
        'Grew up in a village near Vienna, with a Turkish migration background. A neuroscientist by profession and, on the side, a fierce archenemy of the patriarchy. Otherwise, more of a water lover, often found 20 meters below sea level if there’s no response to calls or emails. My pronouns: she/her.',
    },
    {
      id: 4,
      name: 'Marlene Fischer',
      linkedIn: 'www.linkedIn',
      email: 'marlene@sorority.at',
      intro:
        'Left the village west of Vienna to successfully duel with the studies of art history and cultural and social anthropology. Now channels all passions into corporate relations in the cultural sector. Follows the strategy of boundless harmony, combining artistic, cultural, and social engagement. Always curious and a nerd at heart. My pronouns: she/her.',
    },
    {
      id: 5,
      name: 'Rika Mader',
      linkedIn: 'www.linkedIn',
      email: 'rika@sorority.at',
      intro:
        'We are not pretty, we are not ugly – we are angry." The native Styrian lives for justice and isn’t afraid to call out inequalities, both offline and online. When not advocating for equality, she enjoys exploring the "wild" with her camper van or listening to true crime and business podcasts. My pronouns: she/her.',
    },
    {
      id: 6,
      name: 'Natalie Atzenberger',
      linkedIn: 'www.linkedIn',
      email: 'natalie@sorority.at',
      intro:
        'Of Lower Bavarian-Egyptian roots, she has called Vienna home for a decade. A political scientist with a transdisciplinary perspective on inequality, development, gender, and more. Professionally rooted in compliance, diversity, and inclusion. Strives to help people understand the structural dimensions of inequality. Would love to live more spontaneously, ideally with her face in the sun! My pronouns: she/her.',
    },
    {
      id: 7,
      name: 'Carmen Cirnfus',
      linkedIn: 'www.linkedIn',
      email: 'carmen@sorority.at',
      intro:
        'Born in Kenya and raised in rural Austria, her life between cultures has given her multiple perspectives, shaping her commitment to gender rights and equality as well as her drive to challenge stereotypes and prejudices. Alongside feminism, she developed a passion for music and film from a young age. This passion led her to study "Film, TV, and Media Production" and later to a career in the film industry. As a DJ, she explores sounds and often curates her sets featuring women, female-perceived, and non-binary artists. My pronouns: she/they.',
    },
    {
      id: 8,
      name: 'Viktoria Stanzl',
      linkedIn: 'www.linkedIn',
      email: 'victoria@sorority.at',
      intro:
        "After a brief stint in Munich's innovation scene, she returned to her Viennese roots to study Gender Studies and make the European startup landscape more inclusive. Professionally engaged in building communities and an absolute pop culture enthusiast. My pronouns: she/her.",
    },
    {
      id: 9,
      name: 'Evin Ersen',
      linkedIn: 'www.linkedIn',
      email: 'evin@sorority.at',
      intro:
        'Born in Turkey and living in Vienna for 11 years, she considers this city her home. She works in HR with a special interest in diversity and gender management. She values going with the flow and enjoying the moment. My pronouns: she/her.',
    },
    {
      id: 10,
      name: 'Carina Gastelsberger',
      linkedIn: 'www.linkedIn',
      email: 'carina@sorority.at',
      intro:
        'Born and raised in Upper Austria, studying in Vienna was the perfect opportunity to trade the confines of rural life for the freedom of the city. After earning a degree in political science, spending time abroad in the Czech Republic, and nearly three years in Brussels, her love for Vienna remained strong, and she decided to stay. Professionally active in export promotion in the fields of mobility and technology, her heart and mind have long been devoted to feminism and equal opportunities. With age (and the number of children) has come the realization that strong alliances are needed to fight structural inequalities. Fix the system – not the women, not the minorities! My pronouns: she/her.',
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
                  <div>
                    {' '}
                    <LinkedIn
                      height={'16'}
                      color={'black'}
                      link={teamMember.linkedIn}
                    />{' '}
                  </div>
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
