/*
  Warnings:

  - Changed the type of `expiresTime` on the `Gym` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Gym" DROP COLUMN "expiresTime",
ADD COLUMN     "expiresTime" TIMESTAMP(3) NOT NULL;
