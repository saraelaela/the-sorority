import { config } from 'dotenv-safe';
import postgres, { type Sql } from 'postgres';
import { postgresConfig } from '../eslint.config.js';

config();

// const sql = postgres({
//   transform: {
//     undefined: null,
//   },
// });

declare module globalThis {
  let postgresSqlClient: Sql;
}

function connectOneTimeToDatabase() {
  if (!('postgresSqlClient' in globalThis)) {
    globalThis.postgresSqlClient = postgres(postgresConfig);
  }
  return globalThis.postgresSqlClient;
}

export const sql = connectOneTimeToDatabase();
