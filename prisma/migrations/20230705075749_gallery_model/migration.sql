-- CreateTable
CREATE TABLE "Gallery" (
    "id" SERIAL NOT NULL,
    "gymId" INTEGER NOT NULL,
    "imageName" TEXT NOT NULL,
    "creadetAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
