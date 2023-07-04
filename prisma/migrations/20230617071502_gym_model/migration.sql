-- CreateTable
CREATE TABLE "Gym" (
    "id" SERIAL NOT NULL,
    "uniqueCode" INTEGER NOT NULL,
    "persianName" TEXT NOT NULL,
    "englishName" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "address" TEXT,
    "managerName" TEXT,
    "lat" TEXT,
    "long" TEXT,
    "description" TEXT,
    "isOpen" BOOLEAN DEFAULT true,
    "expireTime" INTEGER NOT NULL,

    CONSTRAINT "Gym_pkey" PRIMARY KEY ("id")
);
