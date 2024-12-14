import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { databaseConfig } from '../../utils/config';

const migrationClient = postgres(databaseConfig);

const db = drizzle(migrationClient, {schema});

export default db;