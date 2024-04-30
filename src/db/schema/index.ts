import { sql } from "drizzle-orm";
import {
  index,
  pgTable,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const urls = pgTable(
  "urls",
  {
    id: text("id").primaryKey().unique(),
    target: varchar("target", { length: 1024 }).default(sql`NULL`),
    slug: text("slug").unique().default(sql`NULL`),
    userId: text("user_id"),
    expiredAt: text("expired_at").default(sql`NULL`),
    createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at").default(sql`NULL`),
  },
  (table) => {
    return {
      slugIdx: index("slug").on(table.slug),
      userIdx: index("user_id").on(table.userId),
    };
  },
);
