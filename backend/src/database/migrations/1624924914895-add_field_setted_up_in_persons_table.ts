import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFieldSettedUpInPersonsTable1624924914895
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE persons ADD COLUMN setted_up BOOLEAN NOT NULL DEFAULT FALSE'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE persons DROP COLUMN IF EXISTS setted_up CASCADE'
    );
  }
}
