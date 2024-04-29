CREATE TABLE IF NOT EXISTS "urls" (
	"id" text PRIMARY KEY NOT NULL,
	"target" varchar(1024) DEFAULT NULL,
	"slug" text DEFAULT NULL,
	"user_id" text,
	"expired_at" text DEFAULT NULL,
	"created_at" text DEFAULT (CURRENT_TIMESTAMP),
	"updated_at" text DEFAULT NULL,
	CONSTRAINT "urls_id_unique" UNIQUE("id"),
	CONSTRAINT "urls_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "slug" ON "urls" ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id" ON "urls" ("user_id");