/*
  Warnings:

  - You are about to alter the column `comment` on the `comment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1500)` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE `blog` MODIFY `title` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `comment` MODIFY `comment` VARCHAR(255) NOT NULL;
