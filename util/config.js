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
  if (!process.env.POSTGRES_URL) {
    throw new Error('Required environment variable POSTGRES_URL is missing');
  }
}
config();
