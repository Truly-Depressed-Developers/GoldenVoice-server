import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/libs/drizzle/schema.ts",
  out: "./migrations",
  dbCredentials: {
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string),
    database: process.env.DB_NAME as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD
  }
});