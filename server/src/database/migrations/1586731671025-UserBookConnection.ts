import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserBookConnection1586731671025 implements MigrationInterface {
    name = 'UserBookConnection1586731671025'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE `user_book` (`state` int NOT NULL, `userId` varchar(36) NOT NULL, `bookId` int NOT NULL, PRIMARY KEY (`userId`, `bookId`)) ENGINE=InnoDB', undefined)
      await queryRunner.query('ALTER TABLE `user_book` ADD CONSTRAINT `FK_ab47037d446ad35a3437ad77170` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined)
      await queryRunner.query('ALTER TABLE `user_book` ADD CONSTRAINT `FK_82b430d61bfdb4e840329b48170` FOREIGN KEY (`bookId`) REFERENCES `book`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `user_book` DROP FOREIGN KEY `FK_82b430d61bfdb4e840329b48170`', undefined)
      await queryRunner.query('ALTER TABLE `user_book` DROP FOREIGN KEY `FK_ab47037d446ad35a3437ad77170`', undefined)
      await queryRunner.query('DROP TABLE `user_book`', undefined)
    }
}
