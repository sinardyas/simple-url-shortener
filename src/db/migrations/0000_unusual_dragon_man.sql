DO $$ BEGIN
 CREATE TYPE "sync_from" AS ENUM('cron', 'manual');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "sync_item" AS ENUM('station', 'schedule');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "sync_status" AS ENUM('PENDING', 'SUCCESS', 'FAILED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "schedule" (
	"id" text PRIMARY KEY NOT NULL,
	"station_id" text DEFAULT NULL,
	"train_id" text DEFAULT NULL,
	"line" text DEFAULT NULL,
	"route" text DEFAULT NULL,
	"color" text DEFAULT NULL,
	"destination" text DEFAULT NULL,
	"time_estimated" time DEFAULT NULL,
	"destination_time" time DEFAULT NULL,
	"updated_at" text DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT "schedule_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "station" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text DEFAULT NULL,
	"daop" integer DEFAULT NULL,
	"fg_enable" integer DEFAULT NULL,
	"have_schedule" boolean DEFAULT true,
	"updated_at" text DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT "station_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sync" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"n" bigserial NOT NULL,
	"type" "sync_from" DEFAULT 'manual',
	"status" "sync_status" DEFAULT 'PENDING',
	"item" "sync_item",
	"duration" bigint DEFAULT 0,
	"message" text DEFAULT NULL,
	"started_at" text DEFAULT (CURRENT_TIMESTAMP),
	"ended_at" text DEFAULT NULL,
	"created_at" text DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT "sync_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "station_idx" ON "schedule" ("station_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "time_estimated_idx" ON "schedule" ("time_estimated");