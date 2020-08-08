import {MigrationInterface, QueryRunner} from "typeorm";

export class RemovedEmailPropertyFromAccountEntitySinceItsOnProfile1596879535434 implements MigrationInterface {
    name = 'RemovedEmailPropertyFromAccountEntitySinceItsOnProfile1596879535434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "email"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ADD "email" character varying NOT NULL`, undefined);
    }

}
