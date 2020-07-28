import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameNameColumnOfProductItemToTitle1595939349771 implements MigrationInterface {
    name = 'RenameNameColumnOfProductItemToTitle1595939349771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_item" RENAME COLUMN "name" TO "title"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_item" RENAME COLUMN "title" TO "name"`, undefined);
    }

}
