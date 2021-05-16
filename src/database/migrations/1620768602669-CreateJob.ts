import { Column, MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateJob1620768602669 implements MigrationInterface {
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
            name: "currency_id",
            type: "varchar",
          },
          {
            name: "schedule_job_id",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "datetime",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "datetime",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            referencedTableName: "schedules_jobs",
            referencedColumnNames: ["id"],
            columnNames: ["schedule_job_id"],
          },
          {
            referencedTableName: "currencys",
            referencedColumnNames: ["id"],
            columnNames: ["currency_id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropDatabase("jobs");
  }
}
