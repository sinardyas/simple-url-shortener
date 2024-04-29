import { drizzle } from "drizzle-orm/postgres-js";
import dbConnection from "../commons/libs/db";

import { schedule, station, sync } from "./schema";

const dbSchema = {
  station,
  schedule,
  sync,
};

const db = drizzle(dbConnection, {
  schema: dbSchema,
});

export { dbSchema, db };
