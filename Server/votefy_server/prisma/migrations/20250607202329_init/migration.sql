-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('OPEN_POLL', 'MULTIPLE_CHOICE');

-- CreateTable
CREATE TABLE "Poll" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "options" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "type" "VoteType" NOT NULL,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserVote" (
    "id" TEXT NOT NULL,
    "pollID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserVote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserVote" ADD CONSTRAINT "UserVote_pollID_fkey" FOREIGN KEY ("pollID") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
