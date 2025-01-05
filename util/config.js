import { config } from 'dotenv-safe';
import postgres from 'postgres';

export const postgresConfig = {
  ssl: true,
  transform: {
    ...postgres.camel,
    undefined: null,
  },
}; // Use const assertion

export function setEnvironmentVariables() {
  if (process.env.NODE_ENV === 'production' || process.env.CI) {
    return;
  }
  config();
}
