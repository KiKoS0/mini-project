import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateNewsTable1587911891892 implements MigrationInterface {
    name = 'CreateNewsTable1587911891892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `news` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `link` varchar(255) NOT NULL, `source` varchar(255) NOT NULL, `publishedDate` datetime NOT NULL, `createdDateId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `news_date` (`id` int NOT NULL AUTO_INCREMENT, `date` datetime NOT NULL, UNIQUE INDEX `IDX_78815e4e99e1ad04df645e4611` (`date`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `news` ADD CONSTRAINT `FK_d618c4b9be772a9502095b0f009` FOREIGN KEY (`createdDateId`) REFERENCES `news_date`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `news` DROP FOREIGN KEY `FK_d618c4b9be772a9502095b0f009`", undefined);
        await queryRunner.query("DROP INDEX `IDX_78815e4e99e1ad04df645e4611` ON `news_date`", undefined);
        await queryRunner.query("DROP TABLE `news_date`", undefined);
        await queryRunner.query("DROP TABLE `news`", undefined);
    }

}
