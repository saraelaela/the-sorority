import { config } from 'dotenv';
import { postgresConfig } from './util/config';

config();

export default postgresConfig;
