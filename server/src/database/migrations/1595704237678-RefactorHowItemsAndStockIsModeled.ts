import {MigrationInterface, QueryRunner} from "typeorm";

export class RefactorHowItemsAndStockIsModeled1595704237678 implements MigrationInterface {
    name = 'RefactorHowItemsAndStockIsModeled1595704237678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_9d9d9f94a547c1f7608ffa91633"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_f08704a9683681024ea803c20f8"`, undefined);
        await queryRunner.query(`CREATE TABLE "stock_item_listing" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, "listed_date" TIMESTAMP NOT NULL, "listed_price" numeric NOT NULL, "listed_quantity" integer NOT NULL, "sold_date" TIMESTAMP, "sold_price" numeric NOT NULL, "shipping_cost" numeric NOT NULL, "additional_fees" numeric NOT NULL, "external_id" character varying NOT NULL, "platform_id" integer, CONSTRAINT "PK_611d738361a28acca9deabf5638" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "stock_item_detail" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, "purchase_date" TIMESTAMP NOT NULL, "purchase_price" numeric NOT NULL, "quantity" integer NOT NULL DEFAULT 1, "item_condition_id" integer, "stockroom_id" integer, "location_id" integer, "item_id" integer, "stock_item_listing_detail_id" integer, CONSTRAINT "REL_2a7b89a758a35fd40b9c63fb5a" UNIQUE ("stock_item_listing_detail_id"), CONSTRAINT "PK_f2a868fc1a147ddb2015b55538d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "item_condition_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "stockroom_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "purchase_date"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "purchase_price"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ADD "name" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ADD "category_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_91ba90f150e8804bdaad7b17ff8" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item_listing" ADD CONSTRAINT "FK_15f072e3a96e0179e1c7fa0d40f" FOREIGN KEY ("platform_id") REFERENCES "platform"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item_detail" ADD CONSTRAINT "FK_e1cb2872b5f2ff7881e77091d9f" FOREIGN KEY ("item_condition_id") REFERENCES "item_condition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item_detail" ADD CONSTRAINT "FK_e49a00c1dd0dd72ccc34fe7d486" FOREIGN KEY ("stockroom_id") REFERENCES "stockroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item_detail" ADD CONSTRAINT "FK_45cb33da36e0abebb7a32c35b34" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item_detail" ADD CONSTRAINT "FK_c2520ebf54112ce8b72c48fe10f" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item_detail" ADD CONSTRAINT "FK_2a7b89a758a35fd40b9c63fb5ab" FOREIGN KEY ("stock_item_listing_detail_id") REFERENCES "stock_item_listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_item_detail" DROP CONSTRAINT "FK_2a7b89a758a35fd40b9c63fb5ab"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item_detail" DROP CONSTRAINT "FK_c2520ebf54112ce8b72c48fe10f"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item_detail" DROP CONSTRAINT "FK_45cb33da36e0abebb7a32c35b34"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item_detail" DROP CONSTRAINT "FK_e49a00c1dd0dd72ccc34fe7d486"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item_detail" DROP CONSTRAINT "FK_e1cb2872b5f2ff7881e77091d9f"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item_listing" DROP CONSTRAINT "FK_15f072e3a96e0179e1c7fa0d40f"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_91ba90f150e8804bdaad7b17ff8"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "category_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "name"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ADD "purchase_price" numeric NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ADD "purchase_date" TIMESTAMP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ADD "stockroom_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ADD "item_condition_id" integer`, undefined);
        await queryRunner.query(`DROP TABLE "stock_item_detail"`, undefined);
        await queryRunner.query(`DROP TABLE "stock_item_listing"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_f08704a9683681024ea803c20f8" FOREIGN KEY ("stockroom_id") REFERENCES "stockroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_9d9d9f94a547c1f7608ffa91633" FOREIGN KEY ("item_condition_id") REFERENCES "item_condition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
