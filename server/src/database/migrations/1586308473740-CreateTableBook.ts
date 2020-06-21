import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTableBook1586308473740 implements MigrationInterface {
    name = 'CreateTableBook1586308473740'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE `book` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `subtitle` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `imageLink` varchar(255) NOT NULL, `pageCount` int NOT NULL, `author` varchar(255) NOT NULL, `publishedDate` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE `book`', undefined)
    }
}
