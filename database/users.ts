import { cache } from 'react';
import { sql } from './connect';

// const users = [
//   {
//     id: 1,
//     username: 'saraelabed',
//     password: 'saraelabed',
//     email: 'saraelabed@outlook.de'
//     role: 'admin',
//     intro_text:'Hey there, I am Sara',
//     profile_picture: 'https://cdn.acidcow.com/pics/20180827/animals_01.jpg'
//     created_at: new Date(2024-10-21),

//   },
// ];

export const getUsersInsecure = cache(async (id: number) => {
  const [users] = await sql`
  SELECT
  *
  FROM
  users
  WHERE
  id = ${id}
  `;
  return users;
});
