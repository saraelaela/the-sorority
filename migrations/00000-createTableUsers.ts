import type { Sql } from 'postgres';
import { z } from 'zod';

export const userSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().min(3),
  password: z.string().min(3),
});
export const loginSchema = z.object({
  email: z.string().min(3),
  password: z.string().min(3),
});

export type User = {
  id?: number;
  passwordHash: string;
  firstName: string;
  lastName: string;
  occupation?: string;
  introText?: string;
  profilePicture?: string;
  email: string;
  linkedin?: string;
  isAdmin: boolean;
  createdAt?: Date;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      password_hash varchar(100) NOT NULL,
      first_name varchar(100) NOT NULL,
      last_name varchar(100) NOT NULL,
      occupation varchar(100),
      intro_text varchar(500),
      profile_picture varchar(200),
      email varchar(200) UNIQUE NOT NULL,
      linkedin varchar(200),
      is_admin boolean DEFAULT TRUE
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE users `;
}
