/*
  Warnings:

  - You are about to drop the column `is_verified` on the `RegisteredUsers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RegisteredUsers" DROP COLUMN "is_verified";
