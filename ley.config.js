// import { setEnvironmentVariables } from './util/config.js';

// setEnvironmentVariables();

// const postgresConfig = {
//   db: {
//     ssl: {
//       rejectUnauthorized: false,
//       require: true,
//     },
//     max: 1,
//   },
// };

// export default postgresConfig;

import { postgresConfig, setEnvironmentVariables } from './util/config.js';

setEnvironmentVariables();

// const option = {
//   transform: {
//     ...postgres.camel,
//     undefined: null,
//   },
// };

export default postgresConfig;
