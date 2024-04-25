-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL,
    `account_type` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NULL,
    `isLogin` INTEGER NOT NULL DEFAULT 0,
    `isDeleted` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Account_id_key`(`id`),
    UNIQUE INDEX `Account_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
