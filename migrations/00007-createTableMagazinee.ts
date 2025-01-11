import type { User } from '@prisma/client';
import type { Sql } from 'postgres';

export type BlogPost = {
  id: number;
  userId: number;
  user?: User;
  category: string;
  headline: string;
  intro: string;
  bodyText: string;
  published: Date;
  blogPostImage?: string | null;
};

// export async function up(sql: Sql) {
//   await sql`
//     CREATE TABLE blogposts (
//       id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//       user_id integer UNIQUE REFERENCES users (id) ON DELETE cascade,
//       category varchar(255),
//       headline varchar(255),
//       intro text,
//       bodytext text,
//       published date NOT NULL,
//       blog_post_image varchar(500),
//     )
//   `;
// }

// export async function down(sql: Sql) {
//   await sql` DROP TABLE blogposts `;
// }
