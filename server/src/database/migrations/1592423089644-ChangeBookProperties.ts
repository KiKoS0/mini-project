import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeBookProperties1592423089644 implements MigrationInterface {
    name = 'ChangeBookProperties1592423089644'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `book` ADD `providerName` varchar(255) NOT NULL', undefined)
      await queryRunner.query('ALTER TABLE `book` ADD `providerId` varchar(255) NOT NULL', undefined)
      await queryRunner.query('ALTER TABLE `book` ADD `isbn` varchar(255) NOT NULL', undefined)
      await queryRunner.query('ALTER TABLE `book` ADD UNIQUE INDEX `IDX_bd183604b9c828c0bdd92cafab` (`isbn`)', undefined)
      await queryRunner.query('ALTER TABLE `book` CHANGE `subtitle` `subtitle` varchar(255) NULL', undefined)
      await queryRunner.query('ALTER TABLE `book` DROP COLUMN `description`', undefined)
      await queryRunner.query('ALTER TABLE `book` ADD `description` varchar(5000) NULL', undefined)
      await queryRunner.query('ALTER TABLE `book` DROP COLUMN `imageLink`', undefined)
      await queryRunner.query('ALTER TABLE `book` ADD `imageLink` varchar(5000) NULL', undefined)
      await queryRunner.query('ALTER TABLE `book` CHANGE `publishedDate` `publishedDate` datetime NULL', undefined)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `book` CHANGE `publishedDate` `publishedDate` datetime NOT NULL', undefined)
      await queryRunner.query('ALTER TABLE `book` DROP COLUMN `imageLink`', undefined)
      await queryRunner.query('ALTER TABLE `book` ADD `imageLink` varchar(255) NOT NULL', undefined)
      await queryRunner.query('ALTER TABLE `book` DROP COLUMN `description`', undefined)
      await queryRunner.query('ALTER TABLE `book` ADD `description` varchar(255) NOT NULL', undefined)
      await queryRunner.query('ALTER TABLE `book` CHANGE `subtitle` `subtitle` varchar(255) NOT NULL', undefined)
      await queryRunner.query('ALTER TABLE `book` DROP INDEX `IDX_bd183604b9c828c0bdd92cafab`', undefined)
      await queryRunner.query('ALTER TABLE `book` DROP COLUMN `isbn`', undefined)
      await queryRunner.query('ALTER TABLE `book` DROP COLUMN `providerId`', undefined)
      await queryRunner.query('ALTER TABLE `book` DROP COLUMN `providerName`', undefined)
    }
}
