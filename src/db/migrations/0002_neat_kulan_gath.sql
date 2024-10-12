ALTER TYPE "status" ADD VALUE 'uncollectible';--> statement-breakpoint
ALTER TABLE "invoices" ALTER COLUMN "status" SET DEFAULT 'open';