import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedStockroomIdForeignKeyNotNullableOnLocation1595688478684 implements MigrationInterface {
    name = 'AddedStockroomIdForeignKeyNotNullableOnLocation1595688478684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_118569c8c140605d9c68f1896f0"`, undefined);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "stockroom_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_118569c8c140605d9c68f1896f0" FOREIGN KEY ("stockroom_id") REFERENCES "stockroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_118569c8c140605d9c68f1896f0"`, undefined);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "stockroom_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_118569c8c140605d9c68f1896f0" FOREIGN KEY ("stockroom_id") REFERENCES "stockroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
