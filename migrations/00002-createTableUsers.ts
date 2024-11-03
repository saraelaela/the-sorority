import type { Sql } from 'postgres';
import { z } from 'zod';

export const userSchema = z.object({
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  email: z.string().min(3),
  password: z.string().min(3),
});

export type User = {
  id?: number;
  password_hash: string;
  first_name: string;
  last_name: string;
  occupation?: string;
  intro_text?: string;
  profile_picture?: string;
  email: string;
  linkedin?: string;
  isAdmin: boolean;
  created_at?: Date;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      password_hash varchar(100) NOT NULL,
      first_name varchar(100) NOT NULL,
      last_name varchar(100)  NOT NULL,
      occupation varchar(100),
      intro_text varchar(500),
      profile_picture varchar(200),
      email varchar(200) UNIQUE NOT NULL,
      linkedin varchar(200),
      isAdmin BOOLEAN DEFAULT false
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE users
  `;
}
