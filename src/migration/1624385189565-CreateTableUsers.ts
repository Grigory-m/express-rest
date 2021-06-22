import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUsers1624385189565 implements MigrationInterface {
  name = 'CreateTableUsers1624385189565'

  public up = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.query(`CREATE TABLE "users" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "name" character varying NOT NULL, 
      "login" character varying NOT NULL, 
      "password" character varying NOT NULL, 
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
  }

  public down = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
