import 'server-only';
import type { Sql } from 'postgres';
import postgres from 'postgres';
import { postgresConfig, setEnvironmentVariables } from '../util/config';

setEnvironmentVariables();

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
