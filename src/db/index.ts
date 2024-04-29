import { drizzle } from "drizzle-orm/postgres-js";
import dbConnection from "../commons/libs/db";

import { urls } from "./schema";

const dbSchema = {
  urls,
};

const db = drizzle(dbConnection, {
  schema: dbSchema,
});

export { dbSchema, db };
