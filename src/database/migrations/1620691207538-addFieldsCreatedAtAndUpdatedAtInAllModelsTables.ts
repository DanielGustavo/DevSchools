import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const createdAtColumn = new TableColumn({
  name: 'created_at',
  type: 'date',
  isNullable: false,
  default: 'now()',
});

const updatedAtColumn = new TableColumn({
  name: 'updated_at',
  type: 'date',
  isNullable: false,
  default: 'now()',
});

export class addFieldsCreatedAtAndUpdatedAtInAllModelsTables1620691207538
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('classrooms', [
      createdAtColumn,
      updatedAtColumn,
    ]);

    await queryRunner.addColumns('persons', [createdAtColumn, updatedAtColumn]);

    await queryRunner.addColumns('schools', [createdAtColumn, updatedAtColumn]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('classrooms', [
      createdAtColumn,
      updatedAtColumn,
    ]);

    await queryRunner.dropColumns('persons', [
      createdAtColumn,
      updatedAtColumn,
    ]);

    await queryRunner.dropColumns('schools', [
      createdAtColumn,
      updatedAtColumn,
    ]);
  }
}
