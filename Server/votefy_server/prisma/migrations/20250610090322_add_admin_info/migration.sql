-- CreateTable
CREATE TABLE "AdminInfo" (
    "id" TEXT NOT NULL,
    "adminID" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminInfo_adminID_key" ON "AdminInfo"("adminID");
