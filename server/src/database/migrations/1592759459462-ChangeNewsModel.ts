import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeNewsModel1592759459462 implements MigrationInterface {
    name = 'ChangeNewsModel1592759459462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `news` ADD `description` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `news` ADD `img` varchar(255) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `news` DROP COLUMN `img`", undefined);
        await queryRunner.query("ALTER TABLE `news` DROP COLUMN `description`", undefined);
    }

}
