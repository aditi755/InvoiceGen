ALTER TABLE "customers" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN IF EXISTS "value";