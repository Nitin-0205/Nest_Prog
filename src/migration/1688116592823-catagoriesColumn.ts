import { MigrationInterface, QueryRunner } from "typeorm";

export class CatagoriesColumn1688116592823 implements MigrationInterface {
    name = 'CatagoriesColumn1688116592823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" ADD "Catagories" character varying NOT NULL DEFAULT 'ALL'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "Catagories"`);
    }

}
