/*
  Warnings:

  - Added the required column `projectId` to the `StatusTransition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StatusTransition" ADD COLUMN     "projectId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "StatusTransition" ADD CONSTRAINT "StatusTransition_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
