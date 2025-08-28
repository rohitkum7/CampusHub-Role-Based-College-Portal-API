-- CreateEnum
CREATE TYPE "public"."MaterialType" AS ENUM ('OPTION', 'URL', 'PDF', 'ASSIGNMENT', 'VIDEO');

-- CreateTable
CREATE TABLE "public"."Material" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "public"."MaterialType" NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Material" ADD CONSTRAINT "Material_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
