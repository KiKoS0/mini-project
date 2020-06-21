import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUserBookIndex1592423249986 implements MigrationInterface {
    name = 'AddUserBookIndex1592423249986'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE UNIQUE INDEX `IDX_cbc8bed0fa2eccd72e9ad9f46d` ON `user_book` (`userId`, `bookId`)', undefined)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP INDEX `IDX_cbc8bed0fa2eccd72e9ad9f46d` ON `user_book`', undefined)
    }
}
