import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrate1688025759949 implements MigrationInterface {
    name = 'NewMigrate1688025759949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "check" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "qty" integer NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_de2f7a277e891b3342c5b0d2710" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_profile" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "age" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "UQ_e336cc51b61c40b1b1731308aa5" UNIQUE ("email"), CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sign_up_orm" ("id" SERIAL NOT NULL, "userName" character varying NOT NULL, "contact" bigint NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "profileId" integer, CONSTRAINT "UQ_43565c8ee038f49e6db070f98d7" UNIQUE ("email"), CONSTRAINT "REL_a2d56f009a8bae70e7f28b412b" UNIQUE ("profileId"), CONSTRAINT "PK_8ee47037c34bf14d261d27c81bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "email" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "qty" integer NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sign_up_orm" ADD CONSTRAINT "FK_a2d56f009a8bae70e7f28b412b6" FOREIGN KEY ("profileId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "sign_up_orm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`);
        await queryRunner.query(`ALTER TABLE "sign_up_orm" DROP CONSTRAINT "FK_a2d56f009a8bae70e7f28b412b6"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "sign_up_orm"`);
        await queryRunner.query(`DROP TABLE "user_profile"`);
        await queryRunner.query(`DROP TABLE "check"`);
    }

}
