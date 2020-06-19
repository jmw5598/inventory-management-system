import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1592514796740 implements MigrationInterface {
    name = 'CreateTables1592514796740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "plan" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "UQ_8aa73af67fa634d33de9bf874ab" UNIQUE ("name"), CONSTRAINT "PK_54a2b686aed3b637654bf7ddbb3" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "app_user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, "username" character varying NOT NULL, "password" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "account_id" integer, CONSTRAINT "UQ_c480e576dd71729addbc2d51b67" UNIQUE ("username"), CONSTRAINT "REL_3f710dff1743c1005439f25a6e" UNIQUE ("account_id"), CONSTRAINT "PK_22a5c4a3d9b2fb8e4e73fc4ada1" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "invoice" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, "stripe_customer_id" character varying NOT NULL, "account_id" integer, CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "stripe_customer" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, "stripe_customer_id" character varying NOT NULL, CONSTRAINT "PK_c310602e7039c7719e7a723e24c" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "stock_item" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, "description" character varying NOT NULL, "sku" character varying NOT NULL, "stockroom_id" integer, CONSTRAINT "PK_0b51047279d22d97442d46dfee8" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "stockroom" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, "account_id" integer, CONSTRAINT "PK_62a3d8aa5405793dbd6764d424d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, "email" character varying NOT NULL, "is_confirmed" boolean NOT NULL DEFAULT false, "confirmation_token" character varying NOT NULL, "stripe_customer_id" integer, CONSTRAINT "REL_a4f7240dbed276429f97031d9a" UNIQUE ("stripe_customer_id"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, "street" character varying NOT NULL, "street2" character varying, "city" character varying NOT NULL, "state" character varying NOT NULL, "zip" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "listed_item" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, "listedPrice" integer NOT NULL, "soldPrice" integer NOT NULL, "shippingCost" integer NOT NULL, "additionalFees" integer NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_18d4347f2166d18f82d70f91b58" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "profile" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "address_id" integer, CONSTRAINT "REL_fb70f0dc1dda3ae5e1b7fb0c93" UNIQUE ("address_id"), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user_role" ("appUserId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_da68c101a240945a00d64d76e2b" PRIMARY KEY ("appUserId", "roleId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d6da8d9f50a080d8f71ff8c2e6" ON "user_role" ("appUserId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_dba55ed826ef26b5b22bd39409" ON "user_role" ("roleId") `, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" ADD CONSTRAINT "FK_3f710dff1743c1005439f25a6ec" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "invoice" ADD CONSTRAINT "FK_7743b783da4d0b74b7bfdfd4818" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ADD CONSTRAINT "FK_1d29690055534c65d54f3fa73e2" FOREIGN KEY ("stockroom_id") REFERENCES "stockroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stockroom" ADD CONSTRAINT "FK_81d987603a64e5394877333daac" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_a4f7240dbed276429f97031d9ad" FOREIGN KEY ("stripe_customer_id") REFERENCES "stripe_customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_fb70f0dc1dda3ae5e1b7fb0c93e" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "FK_d6da8d9f50a080d8f71ff8c2e62" FOREIGN KEY ("appUserId") REFERENCES "app_user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_d6da8d9f50a080d8f71ff8c2e62"`, undefined);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_fb70f0dc1dda3ae5e1b7fb0c93e"`, undefined);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_a4f7240dbed276429f97031d9ad"`, undefined);
        await queryRunner.query(`ALTER TABLE "stockroom" DROP CONSTRAINT "FK_81d987603a64e5394877333daac"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" DROP CONSTRAINT "FK_1d29690055534c65d54f3fa73e2"`, undefined);
        await queryRunner.query(`ALTER TABLE "invoice" DROP CONSTRAINT "FK_7743b783da4d0b74b7bfdfd4818"`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" DROP CONSTRAINT "FK_3f710dff1743c1005439f25a6ec"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_dba55ed826ef26b5b22bd39409"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d6da8d9f50a080d8f71ff8c2e6"`, undefined);
        await queryRunner.query(`DROP TABLE "user_role"`, undefined);
        await queryRunner.query(`DROP TABLE "profile"`, undefined);
        await queryRunner.query(`DROP TABLE "listed_item"`, undefined);
        await queryRunner.query(`DROP TABLE "address"`, undefined);
        await queryRunner.query(`DROP TABLE "account"`, undefined);
        await queryRunner.query(`DROP TABLE "stockroom"`, undefined);
        await queryRunner.query(`DROP TABLE "stock_item"`, undefined);
        await queryRunner.query(`DROP TABLE "stripe_customer"`, undefined);
        await queryRunner.query(`DROP TABLE "invoice"`, undefined);
        await queryRunner.query(`DROP TABLE "app_user"`, undefined);
        await queryRunner.query(`DROP TABLE "role"`, undefined);
        await queryRunner.query(`DROP TABLE "plan"`, undefined);
    }

}
