/*
  Warnings:

  - You are about to drop the column `reasoning` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `result` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "reasoning",
DROP COLUMN "result";
