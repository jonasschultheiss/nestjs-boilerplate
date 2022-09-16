-- CreateEnum
CREATE TYPE "TreeKind" AS ENUM ('ash', 'aspen', 'birch', 'cherry');

-- CreateTable
CREATE TABLE "Tree" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(18) NOT NULL,
    "kind" "TreeKind" NOT NULL,
    "age" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tree_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tree_name_key" ON "Tree"("name");
