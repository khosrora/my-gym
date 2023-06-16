-- CreateEnum
CREATE TYPE "USERROLE" AS ENUM ('CLIENT', 'MANAGER', 'COACH');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "fullname" TEXT,
    "haveGym" BOOLEAN NOT NULL,
    "role" "USERROLE" NOT NULL DEFAULT 'CLIENT',
    "codeOtp" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");
