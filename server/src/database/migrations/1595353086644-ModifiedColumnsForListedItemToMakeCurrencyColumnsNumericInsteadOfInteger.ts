import {MigrationInterface, QueryRunner} from "typeorm";

export class ModifiedColumnsForListedItemToMakeCurrencyColumnsNumericInsteadOfInteger1595353086644 implements MigrationInterface {
    name = 'ModifiedColumnsForListedItemToMakeCurrencyColumnsNumericInsteadOfInteger1595353086644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listed_item" DROP COLUMN "listed_price"`, undefined);
        await queryRunner.query(`ALTER TABLE "listed_item" ADD "listed_price" numeric NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "listed_item" DROP COLUMN "sold_price"`, undefined);
        await queryRunner.query(`ALTER TABLE "listed_item" ADD "sold_price" numeric NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "listed_item" DROP COLUMN "shipping_cost"`, undefined);
        await queryRunner.query(`ALTER TABLE "listed_item" ADD "shipping_cost" numeric NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "listed_item" DROP COLUMN "additional_fees"`, undefined);
        await queryRunner.query(`ALTER TABLE "listed_item" ADD "additional_fees" numeric NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listed_item" DROP COLUMN "additional_fees"`, undefined);
        await queryRunner.query(`ALTER TABLE "listed_item" ADD "additional_fees" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "listed_item" DROP COLUMN "shipping_cost"`, undefined);
        await queryRunner.query(`ALTER TABLE "listed_item" ADD "shipping_cost" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "listed_item" DROP COLUMN "sold_price"`, undefined);
        await queryRunner.query(`ALTER TABLE "listed_item" ADD "sold_price" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "listed_item" DROP COLUMN "listed_price"`, undefined);
        await queryRunner.query(`ALTER TABLE "listed_item" ADD "listed_price" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "purchase_price"`, undefined);
    }

}
