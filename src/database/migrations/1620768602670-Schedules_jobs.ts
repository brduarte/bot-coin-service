import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class SchedulesJobs1620768602670 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "schedules_jobs",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "job_id",
            type: "varchar",
          },
          {
            name: "frequency",
            type: "float",
          },
          {
            name: "created_at",
            type: "datetime",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "datetime",
            isNullable: true
          },
        ],
        foreignKeys: [
          {
            referencedTableName: "jobs",
            referencedColumnNames: ["id"],
            columnNames: ["job_id"],
          },
        ],
      })

    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
