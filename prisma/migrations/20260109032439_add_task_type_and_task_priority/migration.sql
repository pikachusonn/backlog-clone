-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('BUG', 'TASK');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "priority" "TaskPriority" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "type" "TaskType" NOT NULL DEFAULT 'TASK';
