import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createPersonsQuestionsTable1626221767372
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'persons_questions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'person_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'question_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'alternative_id',
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

    const personIdForeignKey = new TableForeignKey({
      name: 'persons_questions_person_id_fk',
      columnNames: ['person_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'persons',
      onDelete: 'CASCADE',
    });

    const questionIdForeignKey = new TableForeignKey({
      name: 'persons_questions_question_id_fk',
      columnNames: ['question_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'questions',
      onDelete: 'CASCADE',
    });

    const alternativeIdForeignKey = new TableForeignKey({
      name: 'persons_questions_alternative_id_fk',
      columnNames: ['alternative_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'alternatives',
      onDelete: 'CASCADE',
    });

    await queryRunner.createForeignKeys('persons_questions', [
      personIdForeignKey,
      questionIdForeignKey,
      alternativeIdForeignKey,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'persons_questions',
      'persons_questions_alternative_id_fk'
    );

    await queryRunner.dropForeignKey(
      'persons_questions',
      'persons_questions_question_id_fk'
    );

    await queryRunner.dropForeignKey(
      'persons_questions',
      'persons_questions_person_id_fk'
    );

    await queryRunner.dropTable('persons_questions');
  }
}
