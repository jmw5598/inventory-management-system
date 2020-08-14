import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangedProductItemBrandToMake1597406635881 implements MigrationInterface {
    name = 'ChangedProductItemBrandToMake1597406635881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_item" RENAME COLUMN "brand" TO "make"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_item" RENAME COLUMN "make" TO "brand"`, undefined);
    }

}
