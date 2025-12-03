/*
  Warnings:

  - You are about to drop the column `reasoning` on the `Step` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Step" DROP COLUMN "reasoning";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "reasoning" TEXT,
ADD COLUMN     "result" TEXT;
