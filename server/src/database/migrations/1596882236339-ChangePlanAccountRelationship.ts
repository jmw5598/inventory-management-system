import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangePlanAccountRelationship1596882236339 implements MigrationInterface {
    name = 'ChangePlanAccountRelationship1596882236339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ADD "plan_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_a4fa9c211f9beb64eb36b43a674" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_a4fa9c211f9beb64eb36b43a674"`, undefined);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "plan_id"`, undefined);
    }

}
