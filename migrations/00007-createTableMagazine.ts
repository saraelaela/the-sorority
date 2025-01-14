import type { Sql } from 'postgres';

export type BlogPost = {
  id: number;
  userId: number;
  category: string;
  headline: string;
  bodyText: string;
  intro: string;
  published: Date;
  blogPostImage: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE blogposts (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer UNIQUE REFERENCES users (id) ON DELETE cascade,
      category varchar(255),
      headline varchar(255),
      intro text,
      bodytext text,
      published date NOT NULL,
      blog_post_image varchar(500)
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE blogposts `;
}
