import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableColumns1624388000000 implements MigrationInterface {
  name = 'CreateTableColumns1624388000000'

  public up = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.query(`CREATE TABLE "columns" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "title" character varying NOT NULL, "order" integer NOT NULL, 
        CONSTRAINT "PK_4ac339ccbbfed1dcd96812abbd5" PRIMARY KEY ("id"))`);
  }

  public down = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.query(`DROP TABLE "columns"`);
  }
}
