/*
  Warnings:

  - You are about to drop the column `userId` on the `Result` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentName` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Result" DROP CONSTRAINT "Result_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Result" DROP COLUMN "userId",
ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "studentId" TEXT NOT NULL,
ADD COLUMN     "studentName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Result" ADD CONSTRAINT "Result_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Result" ADD CONSTRAINT "Result_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
