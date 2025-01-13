import { setEnvironmentVariables } from './util/config.js';

setEnvironmentVariables();

const postgresConfig = {
  db: {
    ssl: {
      rejectUnauthorized: false,
      require: true,
    },
    max: 1,
  },
};

export default postgresConfig;
