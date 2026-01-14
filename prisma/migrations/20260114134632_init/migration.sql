-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Activity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul_aktivitas` VARCHAR(191) NOT NULL,
    `kategori` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActivityDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aktivitas_id` INTEGER NOT NULL,
    `nomor_detail` INTEGER NOT NULL,
    `deskripsi_detail` VARCHAR(191) NOT NULL,
    `durasi` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ActivityDetail_aktivitas_id_nomor_detail_key`(`aktivitas_id`, `nomor_detail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityDetail` ADD CONSTRAINT `ActivityDetail_aktivitas_id_fkey` FOREIGN KEY (`aktivitas_id`) REFERENCES `Activity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
