import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedPurchasePriceToItemAndChangePurchaseDateColumnName1595352982017 implements MigrationInterface {
    name = 'AddedPurchasePriceToItemAndChangePurchaseDateColumnName1595352982017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "purchaseDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ADD "purchase_date" TIMESTAMP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ADD "purchase_price" numeric NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "purchase_price"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "purchase_date"`, undefined);
        await queryRunner.query(`ALTER TABLE "item" ADD "purchaseDate" TIMESTAMP NOT NULL`, undefined);
    }

}
