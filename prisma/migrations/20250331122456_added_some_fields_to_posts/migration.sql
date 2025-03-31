/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- First, add the columns as nullable
ALTER TABLE "Post" 
ADD COLUMN "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "date" TIMESTAMP(3),
ADD COLUMN "description" TEXT,
ADD COLUMN "image" TEXT,
ADD COLUMN "location" TEXT,
ADD COLUMN "slug" TEXT,
ADD COLUMN "type" TEXT DEFAULT 'event',
ADD COLUMN "updatedAt" TIMESTAMP(3);

-- Update existing records with default values
UPDATE "Post" 
SET 
  "slug" = 'event-' || id::text,
  "updatedAt" = CURRENT_TIMESTAMP,
  "type" = 'event'
WHERE "slug" IS NULL;

-- Make the columns required
ALTER TABLE "Post" 
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "slug" SET NOT NULL,
ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- Create unique index for slug
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");
