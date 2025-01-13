import { config } from 'dotenv-safe';
import postgres from 'postgres';

export const postgresConfig = {
  ssl: {
    rejectUnauthorized: false,
    require: true,
  },
  transform: {
    ...postgres.camel,
    undefined: null,
  },
  max: 1,
};

export function setEnvironmentVariables() {
  if (process.env.NODE_ENV === 'production' || process.env.CI) {
    return;
  }
  config();
}
