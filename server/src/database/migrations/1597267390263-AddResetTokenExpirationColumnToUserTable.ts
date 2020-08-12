import {MigrationInterface, QueryRunner} from "typeorm";

export class AddResetTokenExpirationColumnToUserTable1597267390263 implements MigrationInterface {
    name = 'AddResetTokenExpirationColumnToUserTable1597267390263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_user" ADD "reset_token_expiration" TIMESTAMP WITH TIME ZONE NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "reset_token_expiration"`, undefined);
    }

}
