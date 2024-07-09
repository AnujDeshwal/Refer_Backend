/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `refer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `referrerName` VARCHAR(255) NOT NULL,
    `referrerEmail` VARCHAR(191) NOT NULL,
    `referrerPhone` VARCHAR(255) NOT NULL,
    `refereeName` VARCHAR(255) NOT NULL,
    `refereeEmail` VARCHAR(191) NOT NULL,
    `refereePhone` VARCHAR(255) NOT NULL,
    `selectedProgram` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `refer_referrerEmail_key`(`referrerEmail`),
    UNIQUE INDEX `refer_refereeEmail_key`(`refereeEmail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
