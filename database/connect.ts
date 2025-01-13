import 'server-only';
import type { Sql } from 'postgres';
import postgres from 'postgres';
import { setEnvironmentVariables } from '../util/config';

setEnvironmentVariables();

declare namespace globalThis {
  let postgresSqlClient: Sql;
}

// Connect only once to the database
function connectOneTimeToDatabase() {
  if (!('postgresSqlClient' in globalThis)) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined');
    }

    // Updated config with SSL settings
    const config = {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      max: 1,
      transform: {
        ...postgres.camel,
        undefined: null,
      },
    };

    globalThis.postgresSqlClient = postgres(process.env.DATABASE_URL, config);
  }

  return globalThis.postgresSqlClient;
}

// Connect to PostgreSQL
export const sql = connectOneTimeToDatabase();
