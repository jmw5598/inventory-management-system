import {MigrationInterface, QueryRunner} from "typeorm";

export class AlteredNullabilityOfSeveralColumnsOnProductItemEntity1595940247483 implements MigrationInterface {
    name = 'AlteredNullabilityOfSeveralColumnsOnProductItemEntity1595940247483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_item" ALTER COLUMN "sku" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "product_item" ALTER COLUMN "brand" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "product_item" ALTER COLUMN "model" SET NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_item" ALTER COLUMN "model" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "product_item" ALTER COLUMN "brand" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "product_item" ALTER COLUMN "sku" SET NOT NULL`, undefined);
    }

}
