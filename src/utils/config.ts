if (process.env.NODE_ENV !== "production") {
   require("dotenv").config();
}

const config = {
   NODE_ENV: process.env.NODE_ENV ?? "development",
   PORT: process.env.PORT ? parseInt(process.env.PORT) : 8000,
   DB_HOST: process.env.DB_HOST ?? "localhost",
   DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
   DB_NAME: process.env.DB_NAME ?? "UDD",
   DB_USER: process.env.DB_USER ?? "UDD",
   DB_PASSWORD: process.env.DB_PASSWORD ?? "qwerty",
   MIGRATE: Boolean(process.env.MIGRATE),
   OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "",
} as const;

const databaseConfig = {
   host: config.DB_HOST,
   port: config.DB_PORT,
   database: config.DB_NAME,
   username: config.DB_USER,
   password: config.DB_PASSWORD,
} as const;

export { config, databaseConfig };