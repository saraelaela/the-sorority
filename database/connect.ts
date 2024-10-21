import { config } from 'dotenv-safe';
import postgres, { type Sql } from 'postgres';

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
    globalThis.postgresSqlClient = postgres({
      transform: {
        ...postgres.camel,
        undefined: null,
      },
    });
  }
  return globalThis.postgresSqlClient;
}

export const sql = connectOneTimeToDatabase();
