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
      })

    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
