import type { User } from '@prisma/client';
import type { Sql } from 'postgres';

export type Payment = {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  adress: string;
  zipCode: number;
  city: string;
  country: string;
  paypal?: string | null;
  creditCard: number;
  paymentStatus: boolean;
  User?: User;
};

// export async function up(sql: Sql) {
//   await sql`
//     CREATE TABLE payment (
//       id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//       user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade,
//       first_name varchar(100) NOT NULL,
//       last_name varchar(100) NOT NULL,
//       adress varchar(500) NOT NULL,
//       zip_code integer NOT NULL,
//       city varchar(100) NOT NULL,
//       country varchar(100) NOT NULL,
//       paypal varchar(500),
//       credit_card integer NOT NULL,
//       payment_status boolean
//     )
//   `;
// } //perform operation

// export async function down(sql: Sql) {
//   await sql` DROP TABLE payment `;
// } // reverse operation
