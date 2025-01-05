import 'server-only';
import type { Sql } from 'postgres';
import postgres from 'postgres';
import { postgresConfig, setEnvironmentVariables } from '../util/config.js';

setEnvironmentVariables();

declare namespace globalThis {
  let postgresSqlClient: Sql;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  if (!('postgresSqlClient' in globalThis)) {
    // Use the connection URL directly
    globalThis.postgresSqlClient = postgres(process.env.POSTGRES_URL!, {
      ssl: {
        rejectUnauthorized: true,
      },
    });
  }

  return globalThis.postgresSqlClient;
}

// Connect to PostgreSQL
export const sql = connectOneTimeToDatabase();
