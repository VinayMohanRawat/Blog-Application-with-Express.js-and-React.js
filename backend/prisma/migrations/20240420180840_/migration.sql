/*
  Warnings:

  - Made the column `content` on table `blog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `blog` MODIFY `content` VARCHAR(191) NOT NULL,
    MODIFY `image` VARCHAR(191) NULL;
