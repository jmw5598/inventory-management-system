import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedResetTokenToUserEntityForPaswordReset1596849023403 implements MigrationInterface {
    name = 'AddedResetTokenToUserEntityForPaswordReset1596849023403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_user" ADD "reset_token" uuid NOT NULL DEFAULT uuid_generate_v4()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "reset_token"`, undefined);
    }

}
