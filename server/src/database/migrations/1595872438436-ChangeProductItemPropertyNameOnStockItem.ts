import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeProductItemPropertyNameOnStockItem1595872438436 implements MigrationInterface {
    name = 'ChangeProductItemPropertyNameOnStockItem1595872438436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_item" DROP CONSTRAINT "FK_02182a0748c6119deecb2ea5697"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" RENAME COLUMN "item_id" TO "product_item_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ADD CONSTRAINT "FK_730ba84eeb07f766a4a18c5e7e8" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_item" DROP CONSTRAINT "FK_730ba84eeb07f766a4a18c5e7e8"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" RENAME COLUMN "product_item_id" TO "item_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ADD CONSTRAINT "FK_02182a0748c6119deecb2ea5697" FOREIGN KEY ("item_id") REFERENCES "product_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
