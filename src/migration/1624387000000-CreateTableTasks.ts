import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableTasks1624387000000 implements MigrationInterface {
  name = 'CreateTableTasks1624387000000'

  public up = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.query(`CREATE TABLE "tasks" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "title" character varying NOT NULL, "order" integer NOT NULL, 
      "description" character varying NOT NULL, "userId" character varying, 
      "boardId" character varying NOT NULL, "columnId" character varying, 
        CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
  }

  public down = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.query(`DROP TABLE "tasks"`);
  }
}
