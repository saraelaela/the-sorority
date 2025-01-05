import 'server-only';
import type { Sql } from 'postgres';
import postgres from 'postgres';
import { postgresConfig, setEnvironmentVariables } from '../util/config';

setEnvironmentVariables();

declare namespace globalThis {
  let postgresSqlClient: Sql;
}

function connectOneTimeToDatabase() {
  if (!('postgresSqlClient' in globalThis)) {
    // Use type assertion since we know these environment variables are required
    const connectionString =
      process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL_NON_POOLING;

    if (!connectionString) {
      throw new Error(
        'Database connection string is missing. Please set either POSTGRES_PRISMA_URL or POSTGRES_URL_NON_POOLING',
      );
    }

    // Type assertion to string since we've verified it exists
    globalThis.postgresSqlClient = postgres(
      connectionString as string,
      postgresConfig,
    );
  }

  return globalThis.postgresSqlClient;
}

// Connect to PostgreSQL
export const sql = connectOneTimeToDatabase();
