import { Column, MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateJob1620767713169 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "jobs",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "datetime",
            default: 'now()'
          },
          {
            name: "updated_at",
            type: "datetime",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.dropDatabase('jobs')
  }
}
