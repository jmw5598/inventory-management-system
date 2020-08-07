import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedAccountProfileAndUserEntitiesForAccountCreating1596818832122 implements MigrationInterface {
    name = 'UpdatedAccountProfileAndUserEntitiesForAccountCreating1596818832122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp`);
        await queryRunner.query(`ALTER TABLE "app_user" RENAME COLUMN "is_active" TO "profile_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "profile_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" ADD "profile_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" ADD CONSTRAINT "UQ_e66ed379f8b17b06d03121ceff5" UNIQUE ("profile_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "confirmation_token"`, undefined);
        await queryRunner.query(`ALTER TABLE "account" ADD "confirmation_token" uuid NOT NULL DEFAULT uuid_generate_v4()`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" ADD CONSTRAINT "FK_e66ed379f8b17b06d03121ceff5" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_user" DROP CONSTRAINT "FK_e66ed379f8b17b06d03121ceff5"`, undefined);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "confirmation_token"`, undefined);
        await queryRunner.query(`ALTER TABLE "account" ADD "confirmation_token" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" DROP CONSTRAINT "UQ_e66ed379f8b17b06d03121ceff5"`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "profile_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" ADD "profile_id" boolean NOT NULL DEFAULT true`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" RENAME COLUMN "profile_id" TO "is_active"`, undefined);
    }

}
