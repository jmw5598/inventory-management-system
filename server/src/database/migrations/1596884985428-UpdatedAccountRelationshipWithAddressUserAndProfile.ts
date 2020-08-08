import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedAccountRelationshipWithAddressUserAndProfile1596884985428 implements MigrationInterface {
    name = 'UpdatedAccountRelationshipWithAddressUserAndProfile1596884985428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_user" DROP CONSTRAINT "FK_e66ed379f8b17b06d03121ceff5"`, undefined);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_a4f7240dbed276429f97031d9ad"`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" DROP CONSTRAINT "UQ_e66ed379f8b17b06d03121ceff5"`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "profile_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "REL_a4f7240dbed276429f97031d9a"`, undefined);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "stripe_customer_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "profile" ADD "account_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "UQ_a39874be76793f8a9be22dcf4df" UNIQUE ("account_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "stripe_customer" ADD "account_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "stripe_customer" ADD CONSTRAINT "UQ_8d06633fd5543f62dcd750e41e0" UNIQUE ("account_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_a39874be76793f8a9be22dcf4df" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stripe_customer" ADD CONSTRAINT "FK_8d06633fd5543f62dcd750e41e0" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stripe_customer" DROP CONSTRAINT "FK_8d06633fd5543f62dcd750e41e0"`, undefined);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_a39874be76793f8a9be22dcf4df"`, undefined);
        await queryRunner.query(`ALTER TABLE "stripe_customer" DROP CONSTRAINT "UQ_8d06633fd5543f62dcd750e41e0"`, undefined);
        await queryRunner.query(`ALTER TABLE "stripe_customer" DROP COLUMN "account_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "UQ_a39874be76793f8a9be22dcf4df"`, undefined);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "account_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "account" ADD "stripe_customer_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "REL_a4f7240dbed276429f97031d9a" UNIQUE ("stripe_customer_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" ADD "profile_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" ADD CONSTRAINT "UQ_e66ed379f8b17b06d03121ceff5" UNIQUE ("profile_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_a4f7240dbed276429f97031d9ad" FOREIGN KEY ("stripe_customer_id") REFERENCES "stripe_customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" ADD CONSTRAINT "FK_e66ed379f8b17b06d03121ceff5" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
