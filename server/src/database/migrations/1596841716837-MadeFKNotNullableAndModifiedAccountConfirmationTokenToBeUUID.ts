import {MigrationInterface, QueryRunner} from "typeorm";

export class MadeFKNotNullableAndModifiedAccountConfirmationTokenToBeUUID1596841716837 implements MigrationInterface {
    name = 'MadeFKNotNullableAndModifiedAccountConfirmationTokenToBeUUID1596841716837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "is_active"`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" ADD "profile_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" ADD CONSTRAINT "UQ_e66ed379f8b17b06d03121ceff5" UNIQUE ("profile_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_fb70f0dc1dda3ae5e1b7fb0c93e"`, undefined);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "address_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4"`, undefined);
        await queryRunner.query(`ALTER TABLE "refresh_token" ALTER COLUMN "user_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" DROP CONSTRAINT "FK_3f710dff1743c1005439f25a6ec"`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" ALTER COLUMN "account_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "invoice" DROP CONSTRAINT "FK_7743b783da4d0b74b7bfdfd4818"`, undefined);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "account_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "stockroom" DROP CONSTRAINT "FK_81d987603a64e5394877333daac"`, undefined);
        await queryRunner.query(`ALTER TABLE "stockroom" ALTER COLUMN "account_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item_listing" DROP CONSTRAINT "FK_15f072e3a96e0179e1c7fa0d40f"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item_listing" ALTER COLUMN "platform_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" DROP CONSTRAINT "FK_53217283a6dee0c97c908184215"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" DROP CONSTRAINT "FK_1d29690055534c65d54f3fa73e2"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" DROP CONSTRAINT "FK_b3399dddfde3b0db25a0475ccde"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" DROP CONSTRAINT "FK_730ba84eeb07f766a4a18c5e7e8"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" DROP CONSTRAINT "FK_a7d787954432157a189ca25d2ba"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ALTER COLUMN "item_condition_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ALTER COLUMN "stockroom_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ALTER COLUMN "location_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ALTER COLUMN "product_item_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ALTER COLUMN "stock_item_listing_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "confirmation_token"`, undefined);
        await queryRunner.query(`ALTER TABLE "account" ADD "confirmation_token" uuid NOT NULL DEFAULT uuid_generate_v4()`, undefined);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_fb70f0dc1dda3ae5e1b7fb0c93e" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4" FOREIGN KEY ("user_id") REFERENCES "app_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" ADD CONSTRAINT "FK_3f710dff1743c1005439f25a6ec" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" ADD CONSTRAINT "FK_e66ed379f8b17b06d03121ceff5" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "invoice" ADD CONSTRAINT "FK_7743b783da4d0b74b7bfdfd4818" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stockroom" ADD CONSTRAINT "FK_81d987603a64e5394877333daac" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item_listing" ADD CONSTRAINT "FK_15f072e3a96e0179e1c7fa0d40f" FOREIGN KEY ("platform_id") REFERENCES "platform"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ADD CONSTRAINT "FK_53217283a6dee0c97c908184215" FOREIGN KEY ("item_condition_id") REFERENCES "item_condition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ADD CONSTRAINT "FK_1d29690055534c65d54f3fa73e2" FOREIGN KEY ("stockroom_id") REFERENCES "stockroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ADD CONSTRAINT "FK_b3399dddfde3b0db25a0475ccde" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ADD CONSTRAINT "FK_730ba84eeb07f766a4a18c5e7e8" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ADD CONSTRAINT "FK_a7d787954432157a189ca25d2ba" FOREIGN KEY ("stock_item_listing_id") REFERENCES "stock_item_listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_item" DROP CONSTRAINT "FK_a7d787954432157a189ca25d2ba"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" DROP CONSTRAINT "FK_730ba84eeb07f766a4a18c5e7e8"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" DROP CONSTRAINT "FK_b3399dddfde3b0db25a0475ccde"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" DROP CONSTRAINT "FK_1d29690055534c65d54f3fa73e2"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" DROP CONSTRAINT "FK_53217283a6dee0c97c908184215"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item_listing" DROP CONSTRAINT "FK_15f072e3a96e0179e1c7fa0d40f"`, undefined);
        await queryRunner.query(`ALTER TABLE "stockroom" DROP CONSTRAINT "FK_81d987603a64e5394877333daac"`, undefined);
        await queryRunner.query(`ALTER TABLE "invoice" DROP CONSTRAINT "FK_7743b783da4d0b74b7bfdfd4818"`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" DROP CONSTRAINT "FK_e66ed379f8b17b06d03121ceff5"`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" DROP CONSTRAINT "FK_3f710dff1743c1005439f25a6ec"`, undefined);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4"`, undefined);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_fb70f0dc1dda3ae5e1b7fb0c93e"`, undefined);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "confirmation_token"`, undefined);
        await queryRunner.query(`ALTER TABLE "account" ADD "confirmation_token" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ALTER COLUMN "stock_item_listing_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ALTER COLUMN "product_item_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ALTER COLUMN "location_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ALTER COLUMN "stockroom_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ALTER COLUMN "item_condition_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ADD CONSTRAINT "FK_a7d787954432157a189ca25d2ba" FOREIGN KEY ("stock_item_listing_id") REFERENCES "stock_item_listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ADD CONSTRAINT "FK_730ba84eeb07f766a4a18c5e7e8" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ADD CONSTRAINT "FK_b3399dddfde3b0db25a0475ccde" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ADD CONSTRAINT "FK_1d29690055534c65d54f3fa73e2" FOREIGN KEY ("stockroom_id") REFERENCES "stockroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item" ADD CONSTRAINT "FK_53217283a6dee0c97c908184215" FOREIGN KEY ("item_condition_id") REFERENCES "item_condition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item_listing" ALTER COLUMN "platform_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_item_listing" ADD CONSTRAINT "FK_15f072e3a96e0179e1c7fa0d40f" FOREIGN KEY ("platform_id") REFERENCES "platform"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stockroom" ALTER COLUMN "account_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "stockroom" ADD CONSTRAINT "FK_81d987603a64e5394877333daac" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "invoice" ALTER COLUMN "account_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "invoice" ADD CONSTRAINT "FK_7743b783da4d0b74b7bfdfd4818" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" ALTER COLUMN "account_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" ADD CONSTRAINT "FK_3f710dff1743c1005439f25a6ec" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "refresh_token" ALTER COLUMN "user_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4" FOREIGN KEY ("user_id") REFERENCES "app_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "address_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_fb70f0dc1dda3ae5e1b7fb0c93e" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" DROP CONSTRAINT "UQ_e66ed379f8b17b06d03121ceff5"`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "profile_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "app_user" ADD "is_active" boolean NOT NULL DEFAULT true`, undefined);
    }

}
