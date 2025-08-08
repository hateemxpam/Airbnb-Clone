/*
  Warnings:

  - You are about to drop the column `imageUrls` on the `apartment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `apartment` DROP COLUMN `imageUrls`;

-- CreateTable
CREATE TABLE `ApartmentImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `apartmentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ApartmentImage` ADD CONSTRAINT `ApartmentImage_apartmentId_fkey` FOREIGN KEY (`apartmentId`) REFERENCES `Apartment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
