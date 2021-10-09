import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createAlternativesTable1626220192147
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'alternatives',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            default: 'uuid_generate_v4()',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'text',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'question_id',
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

    const questionIdForeignKey = new TableForeignKey({
      columnNames: ['question_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'questions',
      name: 'alternatives_question_id_fk',
    });

    await queryRunner.createForeignKey('alternatives', questionIdForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'alternatives',
      'alternatives_question_id_fk'
    );

    await queryRunner.dropTable('alternatives');
  }
}
