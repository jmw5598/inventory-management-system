import {MigrationInterface, QueryRunner} from "typeorm";

export class MadeLocationAndListingRelationsNullableOnStockItems1600006571445 implements MigrationInterface {
    name = 'MadeLocationAndListingRelationsNullableOnStockItems1600006571445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_item" DROP CONSTRAINT "FK_b3399dddfde3b0db25a0475ccde"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" DROP CONSTRAINT "FK_a7d787954432157a189ca25d2ba"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ALTER COLUMN "location_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ALTER COLUMN "stock_item_listing_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ADD CONSTRAINT "FK_b3399dddfde3b0db25a0475ccde" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ADD CONSTRAINT "FK_a7d787954432157a189ca25d2ba" FOREIGN KEY ("stock_item_listing_id") REFERENCES "stock_item_listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_item" DROP CONSTRAINT "FK_a7d787954432157a189ca25d2ba"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" DROP CONSTRAINT "FK_b3399dddfde3b0db25a0475ccde"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ALTER COLUMN "stock_item_listing_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ALTER COLUMN "location_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ADD CONSTRAINT "FK_a7d787954432157a189ca25d2ba" FOREIGN KEY ("stock_item_listing_id") REFERENCES "stock_item_listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ADD CONSTRAINT "FK_b3399dddfde3b0db25a0475ccde" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
