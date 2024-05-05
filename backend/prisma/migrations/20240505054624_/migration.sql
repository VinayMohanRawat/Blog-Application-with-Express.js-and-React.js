-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL,
    `account_type` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NULL,
    `isLogin` INTEGER NOT NULL DEFAULT 0,
    `isDeleted` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Account_id_key`(`id`),
    UNIQUE INDEX `Account_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Blog` (
    `id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `content` VARCHAR(1500) NOT NULL,
    `image` VARCHAR(191) NULL,
    `isPublished` INTEGER NOT NULL DEFAULT 0,
    `isDeleted` INTEGER NOT NULL DEFAULT 0,
    `adminId` INTEGER NOT NULL,

    UNIQUE INDEX `Blog_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL,
    `customerName` VARCHAR(191) NOT NULL,
    `comment` VARCHAR(255) NOT NULL,
    `blogId` INTEGER NOT NULL,
    `customerId` INTEGER NOT NULL,

    UNIQUE INDEX `Comment_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_blogId_fkey` FOREIGN KEY (`blogId`) REFERENCES `Blog`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
