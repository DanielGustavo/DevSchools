import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class addFieldCorrectAlternativeIdInTableQuestions1626220907099
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'questions',
      new TableColumn({
        name: 'correct_alternative_id',
        type: 'uuid',
        isNullable: false,
      })
    );

    const correctAlternativeIdForeignKey = new TableForeignKey({
      name: 'questions_correct_alternative_id_fk',
      columnNames: ['correct_alternative_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'alternatives',
      onDelete: 'CASCADE',
    });

    await queryRunner.createForeignKey(
      'questions',
      correctAlternativeIdForeignKey
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'questions',
      'questions_correct_alternative_id_fk'
    );

    await queryRunner.dropColumn('questions', 'correct_alternative_id');
  }
}
