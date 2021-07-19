import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableBoards1624386000000 implements MigrationInterface {
  name = 'CreateTableBoards1624386000000';

  public up = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.query(`CREATE TABLE "boards" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "title" character varying NOT NULL, "columns" json, 
        CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id"))`);
  };

  public down = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.query(`DROP TABLE "boards"`);
  };
}
