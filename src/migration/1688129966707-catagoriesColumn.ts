import { MigrationInterface, QueryRunner } from "typeorm";

export class CatagoriesColumn1688129966707 implements MigrationInterface {
    name = 'CatagoriesColumn1688129966707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "image" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "image"`);
    }

}
