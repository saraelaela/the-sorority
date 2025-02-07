// import { config } from 'dotenv-safe';
// import postgres from 'postgres';

// export const postgresConfig = {
//   ssl: {
//     rejectUnauthorized: false,
//     require: true,
//   },
//   transform: {
//     ...postgres.camel,
//     undefined: null,
//   },
//   max: 1,
// };

// export function setEnvironmentVariables() {
//   if (process.env.NODE_ENV === 'production' || process.env.CI) {
//     return;
//   }
//   config();
// }

import { config } from 'dotenv-safe';
import postgres from 'postgres';

export const postgresConfig = {
  ssl: Boolean(process.env.POSTGRES_URL),
  transform: {
    ...postgres.camel,
    undefined: null,
  },
};

export function setEnvironmentVariables() {
  if (process.env.NODE_ENV === 'production' || process.env.CI) {
    // Set standard environment variables for Postgres.js from
    // Vercel environment variables
    if (process.env.POSTGRES_URL) {
      process.env.PGHOST = process.env.POSTGRES_HOST;
      process.env.PGDATABASE = process.env.POSTGRES_DATABASE;
      process.env.PGUSERNAME = process.env.POSTGRES_USER;
      process.env.PGPASSWORD = process.env.POSTGRES_PASSWORD;
    }
    return;
  }
  config();
}
