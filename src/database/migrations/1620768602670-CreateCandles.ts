import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCandles1620768602670 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "candles",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "date",
            type: "datetime",
            default: "now()",
          },
          {
            name: "open",
            type: "float",
          },
          {
            name: "low",
            type: "float",
            isNullable: true,
          },
          {
            name: "high",
            type: "float",
            isNullable: true,
          },
          {
            name: "close",
            type: "float",
            isNullable: true,
          },
          {
            name: "job_id",
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
            referencedTableName: "jobs",
            referencedColumnNames: ["id"],
            columnNames: ["job_id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("candles");
  }
}
