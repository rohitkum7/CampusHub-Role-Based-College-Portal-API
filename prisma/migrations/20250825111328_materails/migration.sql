/*
  Warnings:

  - The values [OPTION] on the enum `MaterialType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `courseId` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."MaterialType_new" AS ENUM ('URL', 'PDF', 'ASSIGNMENT', 'VIDEO');
ALTER TABLE "public"."Material" ALTER COLUMN "type" TYPE "public"."MaterialType_new" USING ("type"::text::"public"."MaterialType_new");
ALTER TYPE "public"."MaterialType" RENAME TO "MaterialType_old";
ALTER TYPE "public"."MaterialType_new" RENAME TO "MaterialType";
DROP TYPE "public"."MaterialType_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."Material" ADD COLUMN     "courseId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Material" ADD CONSTRAINT "Material_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
