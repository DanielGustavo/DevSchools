import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createQuestionsTable1626219545318 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'questions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isNullable: false,
            default: 'uuid_generate_v4()',
            isPrimary: true,
          },
          {
            name: 'question',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'homework_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
        ],
      })
    );

    const homeworkIdForeignKey = new TableForeignKey({
      name: 'questions_homework_id_fk',
      columnNames: ['homework_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'homeworks',
      onDelete: 'CASCADE',
    });

    await queryRunner.createForeignKey('questions', homeworkIdForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('questions', 'questions_homework_id_fk');
    await queryRunner.dropTable('questions');
  }
}
