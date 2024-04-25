/*
  Warnings:

  - You are about to alter the column `title` on the `blog` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(30)`.

*/
-- AlterTable
ALTER TABLE `blog` MODIFY `title` VARCHAR(30) NOT NULL,
    MODIFY `content` VARCHAR(255) NOT NULL;
