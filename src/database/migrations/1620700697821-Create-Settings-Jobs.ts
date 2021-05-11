import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSettingsJobs1620700697821 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "settings_jobs",
        columns: [
          {
            name: "id",
            type: "binary",
            isPrimary: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.dropTable('settings_jobs')
  }
}
