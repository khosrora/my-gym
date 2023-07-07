/*
  Warnings:

  - You are about to drop the column `expireTime` on the `Gym` table. All the data in the column will be lost.
  - Added the required column `expiresTime` to the `Gym` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gym" DROP COLUMN "expireTime",
ADD COLUMN     "creadetAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expiresTime" TIMESTAMP(3) NOT NULL;
