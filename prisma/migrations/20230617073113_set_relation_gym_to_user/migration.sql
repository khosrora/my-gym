/*
  Warnings:

  - You are about to drop the column `haveGym` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Gym` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Gym` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gym" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "haveGym";

-- CreateIndex
CREATE UNIQUE INDEX "Gym_userId_key" ON "Gym"("userId");

-- AddForeignKey
ALTER TABLE "Gym" ADD CONSTRAINT "Gym_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
