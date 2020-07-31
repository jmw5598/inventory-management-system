import {MigrationInterface, QueryRunner} from "typeorm";

export class SetNullableToTrueForProductItemSku1596225517133 implements MigrationInterface {
    name = 'SetNullableToTrueForProductItemSku1596225517133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_item" ALTER COLUMN "sku" SET NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_item" ALTER COLUMN "sku" DROP NOT NULL`, undefined);
    }

}
