import styles from '../page.module.scss';
import BlogPostCard from './BlogPostCard';
import BlogPostText from './BlogPostText';

export default function BlogArea() {
  const blogposts = [
    {
      id: 1,
      userId: 1,
      category: 'Kategorie 1',
      headline: 'Geld verhandeln',
      bodyText:
        'Im Zuge unseres monatlichen Sisters Meet Ups hatten wir die Möglichkeit mit Barbara Pöll über das Thema „Gehalt verhandeln“ zu sprechen. Barbara ist Sozialwissenschaftlerin, hat unter anderen einen arbeitsmarktpolitischen Verein für geflüchtete junge Frauen* aufgebaut, als Sozialunternehmerin ein Lokal in der Josefstadt geführt und leitet aktuell die Projekt- und Programmabteilung des Österreichischen Frauenfonds. Dort setzt sich unter anderem für die Förderung der ökonomischen Unabhängigkeit von Frauen* ein und widersetzt sich regelmäßig Mythen wie “Frauen* unterstützen sich nicht gegenseitig” oder “Frauen verhandeln einfach schlechter”. Denn: Dem widersprechen die Fakten nämlich und es gibt selten einfache Erklärungen für komplexe Fragestellungen. Wir haben uns für euch Tipps für eine gelungene Gehaltsverhandlung geholt.',
      intro: 'Hey this is my Intro',
      published: new Date('01-02-2025'),
      blogPostImage:
        'https://res.cloudinary.com/drhdyavyq/image/upload/v1732982526/windows-hNiNxhUfCfQ-unsplash_ozxfmc.jpg',
    },
    {
      id: 2,
      userId: 1,
      category: 'Vorstandszahlen',
      headline: 'Wir sind viele: Der neue Vorstand',
      bodyText:
        'Migrant Women in the Workforce \n The way we view employment has changed in the past decades: from just a means of survival to a path for self-fulfillment. From a feminist perspective, it remains a cornerstone of financial independence and personal autonomy for women. \n But while employment is a net benefit for all women, individual women’s experience of employment varies wildly. Women aren’t a monolith. There is no “universal woman” and as such there is also no universal female experience of employment. \n Depending on life circumstances, access to employment and how this work is valued is still far from equitable. An intersectional approach is crucial to understanding the nuanced challenges faced by diverse groups of women, enabling us to implement meaningful and equitable solutions. \n The title of this article might sound rather pessimistic, but it refers to the particular life circumstances that women with a migration background face. Researchers have named it the double jeopardy or the double disadvantage. \n Put simply, women with a migration background face discrimination and hardships due to each of their identities: both that of a migrant, but also that of a woman. From case to case, there can be additional layers of discrimination that they face: racial, religious, etc., which can have a multiplying effect.',
      intro: 'Hey this is my Intro',
      published: new Date('01-02-2025'),
    },
    {
      id: 3,
      userId: 1,
      category: 'Kategorie 1',
      headline: 'Beyond Borders and Bias',
      bodyText:
        'Migrant Women in the Workforce \n The way we view employment has changed in the past decades: from just a means of survival to a path for self-fulfillment. From a feminist perspective, it remains a cornerstone of financial independence and personal autonomy for women. \n But while employment is a net benefit for all women, individual women’s experience of employment varies wildly. Women aren’t a monolith. There is no “universal woman” and as such there is also no universal female experience of employment. \n Depending on life circumstances, access to employment and how this work is valued is still far from equitable. An intersectional approach is crucial to understanding the nuanced challenges faced by diverse groups of women, enabling us to implement meaningful and equitable solutions. \n The title of this article might sound rather pessimistic, but it refers to the particular life circumstances that women with a migration background face. Researchers have named it the double jeopardy or the double disadvantage. \n Put simply, women with a migration background face discrimination and hardships due to each of their identities: both that of a migrant, but also that of a woman. From case to case, there can be additional layers of discrimination that they face: racial, religious, etc., which can have a multiplying effect.',
      intro: 'Hey this is my Intro',
      published: new Date('01-02-2025'),
      blogPostImage:
        'https://res.cloudinary.com/drhdyavyq/image/upload/v1732999645/rz4vtbbjgauxlbjst4xc.jpg',
    },
    {
      id: 4,
      userId: 1,
      category: 'Business',
      headline: 'Hoch die internationale Solidatität',
      bodyText:
        'Migrant Women in the Workforce \n The way we view employment has changed in the past decades: from just a means of survival to a path for self-fulfillment. From a feminist perspective, it remains a cornerstone of financial independence and personal autonomy for women. \n But while employment is a net benefit for all women, individual women’s experience of employment varies wildly. Women aren’t a monolith. There is no “universal woman” and as such there is also no universal female experience of employment. \n Depending on life circumstances, access to employment and how this work is valued is still far from equitable. An intersectional approach is crucial to understanding the nuanced challenges faced by diverse groups of women, enabling us to implement meaningful and equitable solutions. \n The title of this article might sound rather pessimistic, but it refers to the particular life circumstances that women with a migration background face. Researchers have named it the double jeopardy or the double disadvantage. \n Put simply, women with a migration background face discrimination and hardships due to each of their identities: both that of a migrant, but also that of a woman. From case to case, there can be additional layers of discrimination that they face: racial, religious, etc., which can have a multiplying effect.',
      intro: 'Hey this is my Intro',
      published: new Date('01-02-2025'),
    },
    {
      id: 2,
      userId: 1,
      category: 'Vorstandszahlen',
      headline: 'Wir sind viele: Der neue Vorstand',
      bodyText:
        'Migrant Women in the Workforce \n The way we view employment has changed in the past decades: from just a means of survival to a path for self-fulfillment. From a feminist perspective, it remains a cornerstone of financial independence and personal autonomy for women. \n But while employment is a net benefit for all women, individual women’s experience of employment varies wildly. Women aren’t a monolith. There is no “universal woman” and as such there is also no universal female experience of employment. \n Depending on life circumstances, access to employment and how this work is valued is still far from equitable. An intersectional approach is crucial to understanding the nuanced challenges faced by diverse groups of women, enabling us to implement meaningful and equitable solutions. \n The title of this article might sound rather pessimistic, but it refers to the particular life circumstances that women with a migration background face. Researchers have named it the double jeopardy or the double disadvantage. \n Put simply, women with a migration background face discrimination and hardships due to each of their identities: both that of a migrant, but also that of a woman. From case to case, there can be additional layers of discrimination that they face: racial, religious, etc., which can have a multiplying effect.',
      intro: 'Hey this is my Intro',
      published: new Date('01-02-2025'),
      blogPostImage:
        'https://res.cloudinary.com/drhdyavyq/image/upload/v1732999645/rz4vtbbjgauxlbjst4xc.jpg',
    },
  ];

  console.log(
    blogposts.map((blogpost) => {
      return blogpost.published;
    }),
  );
  return (
    <div className={styles.blogAreaWrapper}>
      {' '}
      <div className={styles.info}>
        {' '}
        <div>
          <p>
            Im Magazin findest du Beiträge zu unseren Events, zu unseren
            Hero:ines, Empfehlungen zur Literatur und Kultur. Es ist auch der
            Ort, an dem wir zu aktuellen Themen Stellung nehmen und Sisters
            schreiben lassen wollen.
          </p>
        </div>
        <div>
          <p>
            Möchtest auch du einen Beitrag für die Community schreiben? Oder
            gibt es ein Thema, das dir am Herz liegt und du hier lesen möchtest?
            Melde dich bei uns: content@sorority.com{' '}
          </p>
        </div>
      </div>
      <div className={styles.blogArea}>
        {blogposts.map((blogpost) => {
          return blogpost.blogPostImage ? (
            <div>
              <BlogPostCard
                category={blogpost.category}
                headline={blogpost.headline}
                bodyText={blogpost.bodyText}
                intro={blogpost.intro}
                published={blogpost.published}
                blogPostImage={blogpost.blogPostImage}
              />
            </div>
          ) : (
            <BlogPostText
              category={blogpost.category}
              headline={blogpost.headline}
              bodyText={blogpost.bodyText}
              intro={blogpost.intro}
              published={blogpost.published}
            />
          );
        })}
      </div>
    </div>
  );
}
