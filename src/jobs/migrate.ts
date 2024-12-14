import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate as drizzleMigrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { databaseConfig } from '../utils/config';

const migrationClient = postgres({
  ...databaseConfig,
  max: 1
});

const migrate = async () => {
  console.log("Starting migration");

  const db = drizzle(migrationClient);

  await drizzleMigrate(db, {
    migrationsFolder: "./migrations"
  });

  await migrationClient.end();

  console.log("Migration done");
}

export { migrate };