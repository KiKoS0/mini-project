import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUserTable1585453479885 implements MigrationInterface {
    name = 'CreateUserTable1585453479885'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE `user` (`id` varchar(36) NOT NULL, `username` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE `user`', undefined)
    }
}
