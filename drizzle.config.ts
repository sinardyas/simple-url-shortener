import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema",
  out: "./src/db/migrations",
  driver: "pg",
  dbCredentials: {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
