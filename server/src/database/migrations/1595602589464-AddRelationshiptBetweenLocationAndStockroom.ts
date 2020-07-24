import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationshiptBetweenLocationAndStockroom1595602589464 implements MigrationInterface {
    name = 'AddRelationshiptBetweenLocationAndStockroom1595602589464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" ADD "stockroom_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_118569c8c140605d9c68f1896f0" FOREIGN KEY ("stockroom_id") REFERENCES "stockroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_118569c8c140605d9c68f1896f0"`, undefined);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "stockroom_id"`, undefined);
    }

}
