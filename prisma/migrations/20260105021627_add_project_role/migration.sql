-- CreateEnum
CREATE TYPE "ProjectRole" AS ENUM ('COLLABORATOR', 'OWNER');

-- AlterTable
ALTER TABLE "ProjectCollaborator" ADD COLUMN     "projectRole" "ProjectRole" NOT NULL DEFAULT 'COLLABORATOR';
