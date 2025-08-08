-- AlterTable
ALTER TABLE `user` ADD COLUMN `phone` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `UserExtraInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `profileImage` VARCHAR(191) NULL,
    `about` VARCHAR(191) NULL,
    `rating` DOUBLE NULL,
    `location` VARCHAR(191) NULL,

    UNIQUE INDEX `UserExtraInfo_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Apartment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `propertyType` VARCHAR(191) NOT NULL,
    `placeType` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `imageUrls` VARCHAR(191) NOT NULL,
    `guests` INTEGER NOT NULL,
    `bedrooms` INTEGER NOT NULL,
    `beds` INTEGER NOT NULL,
    `bathrooms` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserExtraInfo` ADD CONSTRAINT `UserExtraInfo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Apartment` ADD CONSTRAINT `Apartment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
