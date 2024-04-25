-- CreateTable
CREATE TABLE `Blog` (
    `id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` VARCHAR(191) NULL,
    `image` VARCHAR(191) NOT NULL,
    `isPublished` INTEGER NOT NULL DEFAULT 0,
    `isDeleted` INTEGER NOT NULL DEFAULT 0,
    `adminId` INTEGER NOT NULL,

    UNIQUE INDEX `Blog_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
